import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/shared/models/constants';
import { EnvService } from 'src/app/shared/services/env.service';
import { environment } from 'src/environments/environment';
import { IResponse } from '../../../shared/models/response';
import { ICityLocation } from '../models/city';

@Injectable()
export class LocationService {
    private serviceUrl = undefined;
    private provider = environment.provider;

    constructor(
        private env: EnvService,
        private http: HttpClient
        ) {
        this.serviceUrl = `${env.apiUrl}/auth/v1`;
    }

    // tslint:disable-next-line: no-any
    getMyIPAddress(): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        });
        return this.http.get(`${this.provider.proxy}/${this.provider.ip}`, {
            responseType: 'text',
            headers,
        });
    }

    getCityByIPAddress(ip: string): Observable<IResponse> {
        const url = `${this.serviceUrl}/findcity/${ip}`;
        return this.http.get<IResponse>(url);
    }

    getCurrentCity(): Promise<ICityLocation> {
        return new Promise<ICityLocation>((resolve, reject) => {
            let currentCity: ICityLocation;
            new Observable((observer) => {
                observer.next(localStorage.getItem(Constants.LOC_CURRENT_CITY));
            }).subscribe((data) => {
                if (data) {
                    currentCity = JSON.parse(data.toString());
                } else {
                    this.getMyIPAddress().subscribe((resp) => {
                        const ipAddress = JSON.parse(resp);

                        if (ipAddress.ip) {
                            this.getCityByIPAddress(ipAddress.ip).subscribe(
                                (inres) => {
                                    currentCity = {
                                        city: inres.payload.data.data.geo.city,
                                        state:
                                            inres.payload.data.data.geo
                                                .region_name,
                                        stateCode:
                                            inres.payload.data.data.geo
                                                .region_code,
                                        country:
                                            inres.payload.data.data.geo
                                                .country_name,
                                        countryCode:
                                            inres.payload.data.data.geo
                                                .country_code,
                                    };

                                    localStorage.setItem(
                                        Constants.LOC_CURRENT_CITY,
                                        JSON.stringify(currentCity)
                                    );
                                }
                            );
                        }
                    });
                }

                resolve(currentCity);
            });
        });
    }

    changeCurrentCity(city: string): void {
        const currentCity: ICityLocation = {
            city,
            state: 'Alberta',
            stateCode: 'AB',
            country: 'Canada',
            countryCode: 'CA',
        };

        localStorage.setItem(Constants.LOC_CURRENT_CITY, JSON.stringify(currentCity));
    }

    setCurrentCity(city: string): void {
        localStorage.setItem(Constants.LOC_CURRENT_CITY, city);
    }


    getLocByAddress(addr: string): Observable<any> {
        const url = `${this.serviceUrl}/findloc/${addr}`;
        return this.http.get(url);
    }
}
