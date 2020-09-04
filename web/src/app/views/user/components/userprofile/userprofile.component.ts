import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { IReview } from 'src/app/views/review/models/review';
import { ReviewService } from 'src/app/views/review/services/review.service';
import { IUser } from '../../models/user';

@Component({
    selector: 'app-userprofile',
    templateUrl: './userprofile.component.html',
    styleUrls: ['./userprofile.component.scss'],
})
export class UserprofileComponent implements OnInit {
    currentUser: IUser;
    reviews: IReview[];

    constructor(
        private authService: AuthService,
        private reviewService: ReviewService
    ) { }

    ngOnInit(): void {
        this.authService.loginUserSubject$.subscribe(user => {
            if (user) {
                this.currentUser = user;
            }
        });

        this.reviewService.getUserReviews(this.currentUser._id).subscribe(res => {
            this.reviews = res.payload.data;

            if (this.reviews !== undefined && this.reviews.length !== 0) {
                this.reviewService.enrichReviews(this.reviews);
            }
        });
    }
}
