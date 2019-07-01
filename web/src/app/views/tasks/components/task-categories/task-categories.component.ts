import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ITask } from '../../models/ITask';
import { ActivatedRoute, Router } from '@angular/router';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-categories',
  templateUrl: './task-categories.component.html',
  styleUrls: ['./task-categories.component.scss']
})
export class TaskCategoriesComponent implements OnInit {
    model: ITask[];
    currentTask: ITask;

    title = 'app';
    faCoffee = faCoffee;

  constructor(
      private taskService: TaskService,
      private route: ActivatedRoute,
      private router: Router,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
        if (params['category']) {
            const category = params['category'];
            this.getTasksByCategory(category);
        } else {
            this.getTasks();
        }
    });
  }


  getTasksByCategory(category: string) {
      this.taskService.getTasksByCategory(category).subscribe(success => {
          this.model = success.payload;
          this.currentTask = this.model[0];
      });
  }

  getTasks() {
        this.taskService.getTasks().subscribe(success => {
            this.model = success.payload;
            this.currentTask = this.model[0];
        });
    }

    handleChildEvent(task: ITask) {
        this.currentTask.selected = false;
        this.currentTask = task;
        this.currentTask.selected = true;
    }

}
