import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RatingStarComponent } from './components/rating-star/rating-star.component';
import { ReviewDetailComponent } from './components/review-detail/review-detail.component';
import { ReviewRoutingModule } from './review-routing.module';
import { ReviewService } from './services/review.service';



@NgModule({
    declarations: [ReviewDetailComponent, RatingStarComponent],
    imports: [
        CommonModule,
        ReviewRoutingModule
    ],
    providers: [ReviewService],
    exports: [RatingStarComponent],
})
export class ReviewModule { }
