import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './components/projects.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { ProjectService } from './services/project.service';
import { MaterialDesignModule } from 'src/app/material-design/material-design.module';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';
import { DeleteProjectDialogComponent } from './components/edit/delete-dialog/delete-project-dialog.component';

@NgModule({
  declarations: [ProjectsComponent, CreateComponent, EditComponent, DeleteProjectDialogComponent],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharedModule,
    CoreModule,
    MaterialDesignModule,
  ],
  entryComponents: [
    DeleteProjectDialogComponent,
  ],
  exports: [ProjectsComponent, CreateComponent, EditComponent, DeleteProjectDialogComponent],
  providers: [ProjectService]
})
export class ProjectsModule { }
