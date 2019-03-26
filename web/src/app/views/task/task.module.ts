import { TaskComponent } from "./components/task.component";
import { MaterialDesignModule } from "./../../material-design/material-design.module";
import { CoreModule } from "./../../core/core.module";
import { SharedModule } from "./../../shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TaskRoutingModule } from "./task-routing.module";
import { CreateComponent } from "./components/create/create.component";
import { EditComponent } from "./components/edit/edit.component";
import { TaskService } from "./services/task.service";
import { DeleteTaskDialogComponent } from "./components/edit/delete-dialog/delete-task-dialog.component";

@NgModule({
  declarations: [
    TaskComponent,
    CreateComponent,
    EditComponent,
    DeleteTaskDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    MaterialDesignModule,
    TaskRoutingModule
  ],
  entryComponents: [DeleteTaskDialogComponent],
  exports: [
    CreateComponent,
    EditComponent,
    TaskComponent,
    DeleteTaskDialogComponent
  ],
  providers: [TaskService]
})
export class TaskModule {}
