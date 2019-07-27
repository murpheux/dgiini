import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-task-category-node',
    templateUrl: './task-category-node.component.html',
    styleUrls: ['./task-category-node.component.scss']
})
export class TaskCategoryNodeComponent implements OnInit {
    categoryRow: any[] = [];

    constructor(
        private taskService: TaskService,
        private router: Router
        ) { }

    ngOnInit() {
        this.getTaskCategories();
    }

    getTaskCategories() {
        this.taskService.getTaskCategories().subscribe(response => {
            const categories = response.payload;
            this.distributeCategories(categories);
        });
    }

    distributeCategories(categories: string[]) {
        this.categoryRow[0] = categories.slice(0, 6);
        this.categoryRow[1] = categories.slice(6, 12);
    }

    handleCategory(category) {
        this.router.navigate(['/tasks/category/' + category]);
    }

}
