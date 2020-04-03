import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/views/user/services/location.service';
import { ICityLocation } from 'src/app/views/user/models/city';
import { Router } from '@angular/router';

@Component({
    selector: 'app-banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
    currentCity: ICityLocation;
    searchString: string;

    constructor(
        private locationService: LocationService,
        private router: Router,
    ) { }

    async ngOnInit() {
        this.currentCity = await this.locationService.getCurrentCity();
    }

    handleSearch() {
        this.router.navigate([`/tasks/search/${this.searchString}?city=${this.currentCity.city}`]);
    }

}
