import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/shared/models/user';
import { IResponse } from '../../tasks/models/IResponse';
import { Observable, Subject } from 'rxjs';
import { Guid } from 'guid-typescript';
@Injectable()
export class AuthService {
    private serviceUrl = `${environment.APIGW_API}/auth/v1`;
    private loginSubject = new Subject<boolean>();

    private CURRENT_USER = 'currentUser';
    private CURRENT_CITY = 'currentCity';

    constructor(private http: HttpClient) { }

    login(user: User): Observable<IResponse> {
        return this.http.post<IResponse>(`${this.serviceUrl}/login`,
            { username: user.username, password: user.password }).pipe(
                (map(
                    result => {
                        // login successful if there's a jwt token in the response
                        if (result && result.payload) {
                            localStorage.setItem(this.CURRENT_USER, JSON.stringify(result.payload));
                        }

                        return result;
                    }))
            );
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem(this.CURRENT_USER);
    }

    isLoggedIn(): Observable<boolean> {
        return new Observable(observer => { observer.next(localStorage.getItem(this.CURRENT_USER) !== null); });
    }

    getCurrentUser(): Observable<any> {
        return new Observable(observer => { observer.next(JSON.parse(localStorage.getItem(this.CURRENT_USER))); });
    }

    getUserList(userids: Guid[]): Observable<IResponse> {
        const url = `${this.serviceUrl}/users?filter={"_id":[${userids.map(u => '"' + u + '"')}]}`;
        return this.http.get<IResponse>(url);
    }

    getMyIPAddress(): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'text/plain'}); 
        const url = `${environment.IP_SERVICE}`;
        return this.http.get('/api', {responseType: 'text', headers});
    }

    getCityByIPAddress(ip: string): Observable<IResponse> {
        const url = `${this.serviceUrl}/findcity/${ip}`;
        return this.http.get<IResponse>(url);
    }

    getCurrentCity(): Promise<string> {

        return new Promise<string>((resolve, reject) => {
            let currentCity = 'Unknown';
            new Observable(observer => { observer.next(localStorage.getItem(this.CURRENT_CITY)); }).subscribe(data => {
                if (data) {
                    currentCity = data.toString();
                } else {
                    this.getMyIPAddress().subscribe(resp => {
                        const publicIPAddress = resp;

                        console.log(publicIPAddress);

                        if (publicIPAddress) {
                            this.getCityByIPAddress(publicIPAddress).subscribe(inres => {
                                currentCity = inres.payload.data.geo.city;
                                localStorage.setItem(this.CURRENT_CITY, currentCity);
                            });
                        }
                    });
                }

                resolve(currentCity);
            });
        });
    }

    setCurrentCity(city: string) {
        localStorage.setItem(this.CURRENT_CITY, city);
    }
}
