import { Injectable } from '@angular/core';
import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import {
    from,
    of,
    Observable,
    BehaviorSubject,
    combineLatest,
    throwError,
} from 'rxjs';
import {
    tap,
    catchError,
    concatMap,
    shareReplay,
    filter,
    switchMap,
} from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    isLoggedIn$ = new BehaviorSubject(false); // NEW
    requestedScopes = 'openid profile email read:messages write:messages';

    // Create an observable of Auth0 instance of client
    auth0Client$ = (from(
        createAuth0Client({
            domain: environment.auth0.domain,
            client_id: environment.auth0.clientId,
            redirect_uri: `${window.location.origin}`,
            // audience: `https://${environment.auth0.domain}/api/v2/`,
            scope: this.requestedScopes,
            // useRefreshTokens: true,
            cacheLocation: 'localstorage', // valid values are: 'memory' or 'localstorage'
        })
    ) as Observable<Auth0Client>).pipe(
        shareReplay(1), // Every subscription receives the same shared value
        catchError((err) => throwError(err))
    );
    // Define observables for SDK methods that return promises by default
    // For each Auth0 SDK method, first ensure the client instance is ready
    // concatMap: Using the client instance, call SDK method; SDK returns a promise
    // from: Convert that resulting promise into an observable
    isAuthenticated$ = this.auth0Client$.pipe(
        concatMap((client: Auth0Client) => from(client.isAuthenticated())),
        tap((res) => {
            this.loggedIn = res;
            this.isLoggedIn$.next(this.loggedIn); // NEW
        })
    );
    handleRedirectCallback$ = this.auth0Client$.pipe(
        concatMap((client: Auth0Client) =>
            from(client.handleRedirectCallback())
        )
    );
    // Create subject and public observable of user profile data
    private userProfileSubject$ = new BehaviorSubject<any>(null);
    // tslint:disable-next-line: no-any
    private userTokenSubject$ = new BehaviorSubject<any>(null);
    // tslint:disable-next-line: no-any
    private userClaimsSubject$ = new BehaviorSubject<any>(null);

    userProfile$ = this.userProfileSubject$.asObservable();
    userToken$ = this.userTokenSubject$.asObservable();
    userClaims$ = this.userClaimsSubject$.asObservable();

    // Create a local property for login status
    loggedIn: boolean = null;

    constructor(private router: Router) {
        // On initial load, check authentication state with authorization server
        // Set up local auth streams if user is already authenticated
        this.localAuthSetup();
        // Handle redirect from Auth0 login
        this.handleAuthCallback();
    }

    // When calling, options can be passed if desired
    // https://auth0.github.io/auth0-spa-js/classes/auth0client.html#getuser
    getUser$(options?): Observable<any> {
        return this.auth0Client$.pipe(
            concatMap((client: Auth0Client) => from(client.getUser(options))),
            tap((user) => this.userProfileSubject$.next(user))
        );
    }

    // tslint:disable-next-line: no-any
    getClaims$(options?): Observable<any> {
        return this.auth0Client$.pipe(
            concatMap((client: Auth0Client) => from(client.getIdTokenClaims(options))),
            tap(claims => this.userClaimsSubject$.next(claims))
        );
    }

    // tslint:disable-next-line: no-any
    getToken$(options?): Observable<any> {
        return this.auth0Client$.pipe(
            concatMap((client: Auth0Client) => from(client.getTokenSilently(options))),
            tap(token => this.userTokenSubject$.next(token))
        );
    }

    private localAuthSetup(): void {
        // This should only be called on app initialization
        // Set up local authentication streams
        const checkAuth$ = this.isAuthenticated$.pipe(
            concatMap((loggedIn: boolean) => {
                if (loggedIn) {
                    // If authenticated, get user and set in app
                    // NOTE: you could pass options here if needed
                    return this.getUser$();
                }
                // If not authenticated, return stream that emits 'false'
                return of(loggedIn);
            })
        );
        checkAuth$.subscribe((response: { [key: string]: any } | boolean) => {
            this.loggedIn = !!response; // NEW
            this.isLoggedIn$.next(this.loggedIn); // NEW
        });
    }

    getTokenSilently$(options?): Observable<string> {
        // Do not ask for token if we are not logged in yet.
        return this.isLoggedIn$.pipe(
            // Only truthy values will suffice
            filter((isLoggedIn) => !!isLoggedIn),
            // Now we are logged in, and can continue to fetch the token.
            switchMap((loggedIn) =>
                this.auth0Client$.pipe(
                    concatMap((client: Auth0Client) =>
                        from(client.getTokenSilently(options))
                    )
                )
            )
        );
    }

    login(redirectPath: string = '/'): void {
        // A desired redirect path can be passed to login method
        // (e.g., from a route guard)
        // Ensure Auth0 client instance exists
        this.auth0Client$.subscribe((client: Auth0Client) => {
            // Call method to log in
            client.loginWithRedirect({
                redirect_uri: `${window.location.origin}`,
                appState: { target: redirectPath },
            });
        });
    }

    public handleAuthCallback(): void {
        // Call when app reloads after user logs in with Auth0
        const params = window.location.search;
        if (params.includes('code=') && params.includes('state=')) {
            let targetRoute: string; // Path to redirect to after login processsed
            const authComplete$ = this.handleRedirectCallback$.pipe(
                // Have client, now call method to handle auth callback redirect
                tap((cbRes) => {
                    // Get and set target redirect route from callback results
                    targetRoute =
                        cbRes.appState && cbRes.appState.target
                            ? cbRes.appState.target
                            : '/';
                }),
                concatMap(() => {
                    // Redirect callback complete; get user and login status
                    return combineLatest([
                        this.getUser$(),
                        this.getClaims$(), this.getToken$(),
                        this.isAuthenticated$,
                    ]);
                })
            );
            // Subscribe to authentication completion observable
            // Response will be an array of user and login status
            authComplete$.subscribe(([user, loggedIn]) => {
                // Redirect to target route after callback processing
                this.router.navigateByUrl(targetRoute);
            });
        }
    }

    logout(): void {
        // Ensure Auth0 client instance exists
        this.auth0Client$.subscribe((client: Auth0Client) => {
            // Call method to log out
            client.logout({
                client_id: environment.auth0.clientId,
                returnTo: window.location.origin,
            });
        });
    }
}
