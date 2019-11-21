import { Component, OnInit } from '@angular/core';
import { LocationService } from '../user/services/location.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    currentCity: string;

    constructor(
        private locationService: LocationService,
    ) { }

    ngOnInit() {

       this.locationService.getCurrentCity().then(data => {
           this.currentCity = data;
       });
    }

}
