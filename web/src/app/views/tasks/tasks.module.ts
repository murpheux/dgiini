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
import { TaskViewComponent } from './components/task-view/task-view.component';
import { faStar, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { TaskUserComponent } from './components/task-user/task-user.component';
import { library } from '@fortawesome/fontawesome-svg-core';
import { MessageModule } from '../message/message.module';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FeaturedTaskComponent } from './components/featured-task/featured-task.component';
import { TaskStatsComponent } from './components/task-stats/task-stats.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { VendorModule } from '../tasker/tasker.module';
import { ImageStripComponent } from './components/image-strip/image-strip.component';
import { BidComponent } from './components/bid/bid.component';
import { BidListComponent } from './components/bid-list/bid-list.component';
import { TaskEditComponent } from './components/task-edit/task-edit.component';

@NgModule({
    declarations: [
        TaskDetailsComponent,
        TaskCreateComponent,
        TaskCategoriesComponent,
        TaskFilterComponent,
        TaskDeleteDialogComponent,
        TaskCardComponent,
        TaskCategoryNodeComponent,
        TaskViewComponent,
        TaskUserComponent,
        FeaturedTaskComponent,
        TaskStatsComponent,
        ImageStripComponent,
        BidComponent,
        BidListComponent,
        TaskEditComponent,
    ],
    imports: [
        CommonModule,
        TasksRoutingModule,
        SharedModule,
        CoreModule,
        MaterialDesignModule,
        NgxUiLoaderModule,
        FontAwesomeModule,
        MessageModule,
        VendorModule,
        NgxMaterialTimepickerModule,
    ],
    entryComponents: [TaskDeleteDialogComponent],
    exports: [
        TaskCategoriesComponent,
        TaskStatsComponent,
        TaskCreateComponent,
        TaskCardComponent,
        FeaturedTaskComponent,
        TaskCategoryNodeComponent,
    ],
    providers: [TaskService],
})
export class TasksModule {
    contructor(): void {
        library.add(faCoffee, faStar);
    }
}
