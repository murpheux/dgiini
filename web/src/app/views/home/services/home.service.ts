import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { IResponse } from '../../tasks/models/IResponse';

@Injectable({
    providedIn: 'root',
})
export class HomeService {
    constructor(private http: HttpClient) {}
}
