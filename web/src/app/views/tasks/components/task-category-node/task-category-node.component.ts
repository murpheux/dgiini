import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/views/user/services/location.service';
import { ICityLocation } from 'src/app/views/user/models/city';

@Component({
    selector: 'app-task-category-node',
    templateUrl: './task-category-node.component.html',
    styleUrls: ['./task-category-node.component.scss']
})
export class TaskCategoryNodeComponent implements OnInit {
    categories: string[] = [];
    categoryStats: any;
    currentCity: ICityLocation;
    faImageMap = { Cleaning: 'sun', Gardening: 'tree', 'Handy Man': 'wrench',
        'Furniture Assembly': 'tools', 'Lawn Mowing': 'users', 'Snow Plowing': 'laptop',
        Childcare: 'baby-carriage', Moving: 'truck' };

    constructor(
        private locationService: LocationService,
        private taskService: TaskService,
        private router: Router
        ) { }

    async ngOnInit() {
        this.getTaskCategories();
        this.getCategoryStat();

        this.currentCity = await this.locationService.getCurrentCity();

        if (this.currentCity) {
            this.getCategoryStatByCity(this.currentCity.city);
        }
        else {
            this.getCategoryStat();
        }
    }

    getTaskCategories() {
        this.taskService.getTaskCategories().subscribe(response => {
            this.categories = response.payload.data.slice(0, 8);
        });
    }

    handleCategory(category) {
        this.router.navigate([`/tasks/category/${category}`]);
    }

    getCategoryStat() {
        this.taskService.getCategoryStats().subscribe(response => {
            this.categoryStats = this.convertArrayToObject(response.payload.data, '_id');
        });
    }

    getCategoryStatByCity(city: string) {
        this.taskService.getCategoryStatsByCity(city).subscribe(response => {
            this.categoryStats = this.convertArrayToObject(response.payload.data, '_id');
        });
    }

    convertArrayToObject = (array, key) => {
        const initialValue = {};
        return array.reduce((obj, item) => {
          return {
            ...obj,
            [item[key]]: item,
          };
        }, initialValue);
    }

    getstat = (category) => this.categoryStats[category]?.count;

}
