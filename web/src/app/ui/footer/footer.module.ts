import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterTemplateComponent } from './footer-template/footer-template.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FooterTemplateComponent],
  exports: [FooterTemplateComponent]
})
export class FooterModule { }
