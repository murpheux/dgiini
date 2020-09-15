import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Constants } from 'src/app/shared/models/constants';
import { ICityLocation } from 'src/app/views/user/models/city';
import { LocationService } from 'src/app/views/user/services/location.service';


@Component({
    selector: 'app-banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {
    currentCity: ICityLocation;
    searchString: string;
    public selectCityInput = new Subject<string>();

    public selectCityPreLoading = false;
    public cityList: string[] = [];

    cities = Constants.CANADA_CITIES;

    @HostListener('document:keypress', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent): void {
        if (event.key === 'Enter') {
            this.handleSearch();
        }
    }

    constructor(
        private locationService: LocationService,
        private router: Router
    ) {}

    async ngOnInit(): Promise<void> {
        this.currentCity = await this.locationService.getCurrentCity();
        this.cityList = this.cities;

        this.selectCityInput.pipe(debounceTime(500), distinctUntilChanged()
            ).subscribe(term => {
                this.selectCityPreLoading = true;
                this.lookupCity(term);
            });
    }

    lookupCity(term: string): void {
        this.selectCityPreLoading = false;
        this.cityList = this.cities.filter(c => c.startsWith(term));
    }

    handleSearch(): void {
        if (this.searchString) {
            this.router.navigate([`/search/${this.searchString}`]);
        }
    }

    handleCityChange(): void {
        this.locationService.changeCurrentCity(this.currentCity.city);
    }
}
