import { Injectable } from '@angular/core';
import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { from, of, Observable, BehaviorSubject, combineLatest, throwError } from 'rxjs';
import { tap, catchError, concatMap, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    requestedScopes = 'openid profile email read:messages write:messages';
    auth0Client$ = (from(
        createAuth0Client({
            domain: environment.auth0.domain,
            client_id: environment.auth0.clientId,
            redirect_uri: `${window.location.origin}/callback`,
            scope: this.requestedScopes
        })
    ) as Observable<Auth0Client>).pipe(
        shareReplay(1), // Every subscription receives the same shared value
        catchError(err => throwError(err))
    );

    isAuthenticated$ = this.auth0Client$.pipe(
        concatMap((client: Auth0Client) => from(client.isAuthenticated())),
        tap(res => this.loggedIn = res)
    );

    handleRedirectCallback$ = this.auth0Client$.pipe(
        concatMap((client: Auth0Client) => from(client.handleRedirectCallback()))
    );

    private userProfileSubject$ = new BehaviorSubject<any>(null);
    private userTokenSubject$ = new BehaviorSubject<any>(null);
    private userClaimsSubject$ = new BehaviorSubject<any>(null);

    userProfile$ = this.userProfileSubject$.asObservable();
    userToken$ = this.userTokenSubject$.asObservable();
    userClaims$ = this.userClaimsSubject$.asObservable();

    loggedIn: boolean = null;

    constructor(private router: Router) { }

    // When calling, options can be passed if desired
    // https://auth0.github.io/auth0-spa-js/classes/auth0client.html#getuser
    getUser$(options?): Observable<any> {
        return this.auth0Client$.pipe(
            concatMap((client: Auth0Client) => from(client.getUser(options))),
            tap(user => this.userProfileSubject$.next(user))
        );
    }

    getClaims$(options?): Observable<any> {
        return this.auth0Client$.pipe(
            concatMap((client: Auth0Client) => from(client.getIdTokenClaims(options))),
            tap(claims => this.userClaimsSubject$.next(claims))
        );
    }

    getToken$(options?): Observable<any> {
        return this.auth0Client$.pipe(
            concatMap((client: Auth0Client) => from(client.getTokenSilently(options))),
            tap(token => this.userTokenSubject$.next(token))
        );
    }

    localAuthSetup() {
        const checkAuth$ = this.isAuthenticated$.pipe(
            concatMap((loggedIn: boolean) => {
                if (loggedIn) {

                    return this.getUser$();
                }
                return of(loggedIn);
            })
        );

        const checkAuthSub = checkAuth$.subscribe((response: { [key: string]: any } | boolean) => {
            this.loggedIn = !!response;
            checkAuthSub.unsubscribe();
        });
    }

    login(redirectPath: string = '/') {
        this.auth0Client$.subscribe((client: Auth0Client) => {
            // Call method to log in
            client.loginWithRedirect({
                redirect_uri: `${window.location.origin}/callback`,
                appState: { target: redirectPath }
            });
        });
    }

    handleAuthCallback() {

        let targetRoute: string; // Path to redirect to after login processsed
        const authComplete$ = this.handleRedirectCallback$.pipe(
            // Have client, now call method to handle auth callback redirect
            tap(cbRes => {
                // Get and set target redirect route from callback results
                targetRoute = cbRes.appState && cbRes.appState.target ? cbRes.appState.target : '/';
            }),
            concatMap(() => {
                return combineLatest(
                    [ this.getUser$(), this.getClaims$(), this.getToken$(), this.isAuthenticated$ ]
                );
            })
        );

        const authCompleteSub = authComplete$.subscribe(([user, loggedIn]) => {
            // Redirect to target route after callback processing
            this.router.navigate([targetRoute]);
            authCompleteSub.unsubscribe();
        });
    }

    logout() {
        this.auth0Client$.subscribe((client: Auth0Client) => {
            client.logout({
                client_id: environment.auth0.clientId,
                returnTo: window.location.origin
            });
        });
    }

}
