import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TaskListComponent } from './components/task-list/task-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { MaterialDesignModule } from 'src/app/material-design/material-design.module';
import { TaskService } from './services/task.service';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { TaskCreateComponent } from './components/task-create/task-create.component';
import { TaskCategoriesComponent } from './components/task-categories/task-categories.component';
import { TaskBrowseComponent } from './components/task-browse/task-browse.component';
import { TaskFilterComponent } from './components/task-filter/task-filter.component';


@NgModule({
    declarations: [TaskListComponent, TaskDetailsComponent, TaskCreateComponent, TaskCategoriesComponent, TaskBrowseComponent, TaskFilterComponent],
    imports: [
        CommonModule,
        TasksRoutingModule,
        SharedModule,
        CoreModule,
        MaterialDesignModule,
        NgxUiLoaderModule,
    ],
    exports: [TaskListComponent, TaskCategoriesComponent, TaskCreateComponent],
    providers: [TaskService]
})
export class TasksModule { }
