import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CorpModule } from 'src/app/views/corp/corp.module';
import { TasksModule } from 'src/app/views/tasks/tasks.module';
import { UserModule } from 'src/app/views/user/user.module';
import { HeaderTemplateComponent } from './header-template/header-template.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CoreModule,
        SharedModule,
        TasksModule,
        CorpModule,
        UserModule,
        MatDialogModule,
        MatIconModule,
    ],
    declarations: [HeaderTemplateComponent],
    exports: [HeaderTemplateComponent]
})
export class HeaderModule {}
