import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewRoutingModule } from './review-routing.module';
import { ReviewDetailComponent } from './components/review-detail/review-detail.component';


@NgModule({
  declarations: [ReviewDetailComponent],
  imports: [
    CommonModule,
    ReviewRoutingModule
  ]
})
export class ReviewModule { }
