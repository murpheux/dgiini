import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderTemplateComponent } from './header-template/header-template.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TasksModule } from 'src/app/views/tasks/tasks.module';
import { UserModule } from 'src/app/views/user/user.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CoreModule,
    SharedModule,
    TasksModule,
    UserModule,
    MatDialogModule
  ],
  declarations: [HeaderTemplateComponent],
  exports: [HeaderTemplateComponent]
})
export class HeaderModule { }
