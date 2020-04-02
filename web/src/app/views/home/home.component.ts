import { Component, OnInit } from '@angular/core';
import { LocationService } from '../user/services/location.service';
import { ICityLocation } from '../user/models/city';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    currentCity: ICityLocation;

    constructor(
        private locationService: LocationService,
    ) { }

    ngOnInit() {

       this.locationService.getCurrentCity().then(data => {
           this.currentCity = data;
       });
    }

}
