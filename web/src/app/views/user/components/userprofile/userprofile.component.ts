import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ReviewService } from 'src/app/views/review/services/review.service';
import { IReview } from 'src/app/views/review/models/review';
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
    ) {}

    ngOnInit(): void {
        this.authService.loginUserSubject$.subscribe(user => {
            if (user) {
                this.currentUser = user;
            }
        });

        this.reviewService.getUserReviews().subscribe(res => {
            this.reviews = res.payload.data;
        });
    }
}
