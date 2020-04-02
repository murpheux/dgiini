import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/views/user/services/location.service';
import { ICityLocation } from 'src/app/views/user/models/city';

@Component({
    selector: 'app-banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
    currentCity: ICityLocation;

    constructor(
        private locationService: LocationService
    ) { }

    ngOnInit() {
        this.locationService.getCurrentCity().then(city => {
            this.currentCity = city;
        });
    }

}
