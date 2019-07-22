import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { MaterialDesignModule } from 'src/app/material-design/material-design.module';
import { TaskService } from './services/task.service';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { TaskCreateComponent } from './components/task-create/task-create.component';
import { TaskCategoriesComponent } from './components/task-categories/task-categories.component';
import { TaskFilterComponent } from './components/task-filter/task-filter.component';
import { TaskDeleteDialogComponent } from './components/task-details/delete-dialog/task-delete-dialog.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { TaskCategoryNodeComponent } from './components/task-category-node/task-category-node.component';
import { TaskShowcaseComponent } from './components/task-showcase/task-showcase.component';
import { TaskViewComponent } from './components/task-view/task-view.component';
import { faStar, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { TaskUserComponent } from './components/task-user/task-user.component';
import { TaskUserFilterComponent } from './components/task-user-filter/task-user-filter.component';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TaskCardLinkComponent } from './components/task-card-link/task-card-link.component';
import { MessageModule } from '../message/message.module';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

@NgModule({
    declarations: [TaskDetailsComponent,
        TaskCreateComponent, TaskCategoriesComponent,
        TaskFilterComponent, TaskDeleteDialogComponent, TaskCardComponent,
        TaskCategoryNodeComponent, TaskShowcaseComponent, TaskViewComponent,
        TaskUserComponent, TaskUserFilterComponent, TaskCardLinkComponent],
    imports: [
        CommonModule,
        TasksRoutingModule,
        SharedModule,
        CoreModule,
        MaterialDesignModule,
        NgxUiLoaderModule,
        FontAwesomeModule,
        MessageModule,
        NgxMaterialTimepickerModule
    ],
    entryComponents: [
        TaskDeleteDialogComponent,
      ],
    exports: [TaskCategoriesComponent,
        TaskCreateComponent, TaskCardComponent,
        TaskCategoryNodeComponent, TaskShowcaseComponent],
    providers: [TaskService]
})
export class TasksModule {

    contructor() {
        library.add(faCoffee);
    }

}
