import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderTemplateComponent } from './header-template/header-template.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CoreModule,
    SharedModule
  ],
  declarations: [HeaderTemplateComponent],
  exports: [HeaderTemplateComponent]
})
export class HeaderModule { }
