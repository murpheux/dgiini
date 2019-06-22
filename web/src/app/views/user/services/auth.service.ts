import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { EndPoints } from 'src/app/shared/models/end-points';
import { User } from 'src/app/shared/models/user';
@Injectable()
export class AuthService {
    constructor(private http: HttpClient) { }

    login(userModel: User) {
        return this.http.post<any>(`${environment.DOMAIN}/${EndPoints.AUTH_LOGIN}`, {
                username: userModel.username,
                password: userModel.password,
                domainName: userModel.domain
            }).pipe(
            (map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.data) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify( user.data));
                }

                return user;
            })));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
