import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';

@Component({
    selector: 'app-task-category-node',
    templateUrl: './task-category-node.component.html',
    styleUrls: ['./task-category-node.component.scss']
})
export class TaskCategoryNodeComponent implements OnInit {
    categories: []; // = [ 'Business & Admin', 'Cleaning', 'Delivery & removals',
        // 'Furniture Assembly', 'Handyman', 'Marketing & Design', 'Home & Gardening',
        // 'Others' ];

    constructor(private homeService: HomeService) { }

    ngOnInit() {
        this.getTaskCategories();
    }

    getTaskCategories() {
        this.homeService.getTaskCategories().subscribe(response => {
            this.categories = response.payload.result;
        });
    }

}
