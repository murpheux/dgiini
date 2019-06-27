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
import { TaskDeleteDialogComponent } from './components/task-details/delete-dialog/task-delete-dialog.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { TaskCategoryNodeComponent } from './components/task-category-node/task-category-node.component';
import { TaskShowcaseComponent } from './components/task-showcase/task-showcase.component';
import { TaskViewComponent } from './components/task-view/task-view.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';


@NgModule({
    declarations: [TaskListComponent, TaskDetailsComponent,
        TaskCreateComponent, TaskCategoriesComponent, TaskBrowseComponent,
        TaskFilterComponent, TaskDeleteDialogComponent, TaskCardComponent,
        TaskCategoryNodeComponent, TaskShowcaseComponent, TaskViewComponent],
    imports: [
        CommonModule,
        TasksRoutingModule,
        SharedModule,
        CoreModule,
        MaterialDesignModule,
        NgxUiLoaderModule,
        FontAwesomeModule
    ],
    entryComponents: [
        TaskDeleteDialogComponent,
      ],
    exports: [TaskListComponent, TaskCategoriesComponent,
        TaskCreateComponent, TaskCardComponent,
        TaskCategoryNodeComponent, TaskShowcaseComponent],
    providers: [TaskService]
})
export class TasksModule {

    contructor() {
        library.add( faLocationArrow );
    }

}
