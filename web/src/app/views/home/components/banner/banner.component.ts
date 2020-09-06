import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    }

    handleSearch(): void {
        if (this.searchString) {
            this.router.navigate([`/search/${this.searchString}`]);
        }
    }
}
