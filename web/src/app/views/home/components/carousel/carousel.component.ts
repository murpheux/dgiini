import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/views/user/services/location.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from 'src/app/views/tasks/services/task.service';
import { Router } from '@angular/router';
import { ICityLocation } from 'src/app/views/user/models/city';

@Component({
    selector: 'app-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
    searchFormGroup: FormGroup;
    currentCity: ICityLocation;

    constructor(
        private locationService: LocationService,
        private formBuilder: FormBuilder,
        private taskService: TaskService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.locationService.getCurrentCity().then((city) => {
            this.currentCity = city;
        });

        this.searchFormGroup = this.formBuilder.group({
            search: this.formBuilder.control('', [Validators.required]),
        });
    }

    handleSearch(searchValues): void {
        this.router.navigate(['/tasks/search/' + searchValues.search]);
    }
}
