import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IResponse } from '../../tasks/models/IResponse';
import { Observable, Subject } from 'rxjs';
import { Constants } from 'src/app/shared/models/constants';
@Injectable()
export class LocationService {
    private serviceUrl = `${environment.gateway.api}/auth/v1`;

    constructor(private http: HttpClient) { }

    // tslint:disable-next-line: no-any
    getMyIPAddress(): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'text/plain'});
        return this.http.get('/api', {responseType: 'text', headers});
    }

    getCityByIPAddress(ip: string): Observable<IResponse> {
        const url = `${this.serviceUrl}/findcity/${ip}`;
        return this.http.get<IResponse>(url);
    }

    getCurrentCity(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            let currentCity = 'Unknown';
            new Observable(observer => { observer.next(localStorage.getItem(Constants.LOC_CURRENT_CITY)); }).subscribe(data => {
                if (data) {
                    currentCity = data.toString();
                } else {
                    this.getMyIPAddress().subscribe(resp => {
                        const publicIPAddress = resp;

                        if (publicIPAddress) {
                            this.getCityByIPAddress(publicIPAddress).subscribe(inres => {
                                currentCity = inres.payload.data.data.geo.city;
                                localStorage.setItem(Constants.LOC_CURRENT_CITY, currentCity);
                            });
                        }
                    });
                }

                resolve(currentCity);
            });
        });
    }

    setCurrentCity(city: string) {
        localStorage.setItem(Constants.LOC_CURRENT_CITY, city);
    }
}
