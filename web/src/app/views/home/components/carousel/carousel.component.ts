import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/views/user/services/location.service';

@Component({
    selector: 'app-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

    currentCity: string;
    constructor(
        private locationService: LocationService,
    ) { }

    ngOnInit() {
        this.locationService.getCurrentCity().then(city => {
            this.currentCity = city;
        });
    }

}
