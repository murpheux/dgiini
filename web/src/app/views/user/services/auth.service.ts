import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/shared/models/user';
import { IResponse } from '../../tasks/models/IResponse';
import { Observable } from 'rxjs';
@Injectable()
export class AuthService {
    private serviceUrl = `${environment.AUTH_API}`;

    constructor(private http: HttpClient) { }

    login(user: User): Observable<IResponse> {
        return this.http.post<IResponse>(`${this.serviceUrl}/login`,
            { username: user.username, password: user.password }).pipe(
                (map(
                    result => {
                        // login successful if there's a jwt token in the response
                        if (result && result.payload) {
                            localStorage.setItem('currentUser', JSON.stringify(result.payload));
                        }

                        return result;
                    }))
            );
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
