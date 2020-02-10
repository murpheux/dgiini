import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/views/user/services/location.service';

@Component({
    selector: 'app-banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
    currentCity: string;

    constructor(
        private locationService: LocationService
    ) { }

    ngOnInit() {
        this.locationService.getCurrentCity().then(city => {
            this.currentCity = city;
        });
    }

}
