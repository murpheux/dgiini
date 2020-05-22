import { Component, OnInit } from '@angular/core';
import { LocationService } from '../user/services/location.service';
import { ICityLocation } from '../user/models/city';
import { Constants } from 'src/app/shared/models/constants';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    currentCity: ICityLocation;
    vendorClientState = Constants.USER_ROLE_CLIENT; // default client state

    constructor(
        private locationService: LocationService,
    ) { }

    ngOnInit() {

       this.locationService.getCurrentCity().then(data => {
           this.currentCity = data;
       });
    }

    handleStateChanged(state: string) {
        this.vendorClientState = state;
    }

}
