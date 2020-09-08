import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { IReview } from 'src/app/views/review/models/review';
import { ReviewService } from 'src/app/views/review/services/review.service';
import { TaskService } from 'src/app/views/tasks/services/task.service';
import { IUser } from '../../models/user';
import { IVendor } from '../../models/vendor';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-userprofile',
    templateUrl: './userprofile.component.html',
    styleUrls: ['./userprofile.component.scss'],
})
export class UserprofileComponent implements OnInit {
    currentUser: IUser;
    reviews: IReview[];
    isVendor = false;
    stats: any[];
    vendor: IVendor;

    constructor(
        private authService: AuthService,
        private reviewService: ReviewService,
        private taskService: TaskService,
        private userServive: UserService,
    ) { }

    ngOnInit(): void {
        this.authService.loginUserSubject$.subscribe(user => {
            if (user) {
                this.currentUser = user;
                this.isVendor = user.role.includes('vendor');

                if (this.isVendor) {
                    this.userServive.getUserByEmail(this.currentUser.username).subscribe(res => {
                        this.vendor = res.payload.data;
                    });
                }
            }
        });

        this.reviewService.getUserReviews(this.currentUser._id).subscribe(res => {
            this.reviews = res.payload.data;

            if (this.reviews !== undefined && this.reviews.length !== 0) {
                this.reviewService.enrichReviews(this.reviews);
            }
        });

        this.taskService.getUserStatusStats(this.currentUser._id).subscribe(res => {
            this.stats = res.payload.data;
        });
    }

    average(): number {
        const nums = this.reviews.map(m => m.rating);
        return nums.reduce((x, y) => x + y, 0)  / nums.length;
    }

    getStat(mode: string): number {
        return this.stats.find(el => el._id === mode).count;
    }

    getAll(): number {
        if (!this.stats) { return 0; }

        return this.stats.map(m => m.count).reduce((x, y) => x + y);
    }
}
