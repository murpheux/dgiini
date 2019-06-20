import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
import { IResponse } from '../../tasks/models/IResponse';

@Component({
    selector: 'app-task-showcase',
    templateUrl: './task-showcase.component.html',
    styleUrls: ['./task-showcase.component.scss']
})
export class TaskShowcaseComponent implements OnInit {
    model: any;

    constructor(private homeService: HomeService) { }

    ngOnInit() {
        this.getTasks();
    }

    getTasks() {
        this.homeService.getTasks().subscribe((response: IResponse) => {
            this.model = response.payload;
        });
    }

}
