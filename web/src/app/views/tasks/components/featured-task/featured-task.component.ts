import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NologinComponent } from 'src/app/views/home/components/nologin/nologin.component';
import { TaskService } from '../../services/task.service';
import { TaskCategoriesComponent } from '../task-categories/task-categories.component';

@Component({
    selector: 'app-featured-task',
    templateUrl: './featured-task.component.html',
    styleUrls: ['./featured-task.component.scss'],
})
export class FeaturedTaskComponent implements OnInit {
    featuredTasks: [];
    recentTasks: [];

    constructor(
        private taskService: TaskService,
        private dialog: MatDialog,
        public authService: AuthService,
    ) {}

    ngOnInit(): void {
        this.getFeaturedTasks();
        this.getRecentTasks();
    }

    getFeaturedTasks(): void {
        this.taskService.getFeaturedTasks().subscribe((response) => {
            const tasks = response.payload.data;
            this.featuredTasks = tasks.slice(0, 7);

            this.taskService.enrichTasksWithPhotos(this.featuredTasks);
        });
    }

    getRecentTasks(): void {
        this.taskService.getRecentTasks().subscribe((response) => {
            const tasks = response.payload.data;
            this.recentTasks = tasks.slice(0, 3);

            this.taskService.enrichTasksWithPhotos(this.recentTasks);
        });
    }

    async bidNow(id: any): Promise<void> {
        let dialogRef;

        this.authService.isLoggedIn$.subscribe(state => {
            if (state) {
                dialogRef = this.dialog.open(TaskCategoriesComponent, {
                    height: '570px',
                    width: '800px',
                    disableClose: true,
                    data: {
                        id
                    }
                });
            } else {
                dialogRef = this.dialog.open(NologinComponent, {
                    height: '570px',
                    width: '350px',
                });
            }
        });
    }
}
