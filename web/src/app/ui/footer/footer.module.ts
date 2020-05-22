import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterTemplateComponent } from './footer-template/footer-template.component';
import { MaterialDesignModule } from 'src/app/material-design/material-design.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialDesignModule,
  ],
  declarations: [FooterTemplateComponent],
  exports: [FooterTemplateComponent]
})
export class FooterModule { }
