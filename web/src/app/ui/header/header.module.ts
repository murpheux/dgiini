import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderTemplateComponent } from './header-template/header-template.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [HeaderTemplateComponent],
  exports: [HeaderTemplateComponent]
})
export class HeaderModule { }
