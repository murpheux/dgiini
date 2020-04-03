import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-task-category-node',
    templateUrl: './task-category-node.component.html',
    styleUrls: ['./task-category-node.component.scss']
})
export class TaskCategoryNodeComponent implements OnInit {
    categories: string[] = [];
    categoryStats: any;
    faImageMap = { Cleaning: 'sun', Gardening: 'tree', 'Handy Man': 'wrench',
        'Furniture Assembly': 'tools', 'Lawn Mowing': 'users', 'Snow Plowing': 'laptop',
        Childcare: 'baby-carriage', Moving: 'truck' };

    constructor(
        private taskService: TaskService,
        private router: Router
        ) { }

    ngOnInit() {
        this.getTaskCategories();
        this.getCategoryStat();
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
