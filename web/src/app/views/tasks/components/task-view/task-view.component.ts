import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
    faCalendar, faCheck, faDollarSign, faFileAlt,
    faInfoCircle, faMapMarkedAlt, faTimes, faUserCircle
} from '@fortawesome/free-solid-svg-icons';
import { ILocation } from 'src/app/shared/models/location';
import { IMail } from 'src/app/shared/models/mail';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CommunicationService } from 'src/app/shared/services/communication.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { PubProfileComponent } from 'src/app/views/user/components/pub-profile/pub-profile.component';
import { IAddress } from 'src/app/views/user/models/address';
import { IUser } from 'src/app/views/user/models/user';
import { LocationService } from 'src/app/views/user/services/location.service';
import { IBid } from '../../models/bid';
import { ITask, TaskStatus } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
    selector: 'app-task-view',
    templateUrl: './task-view.component.html',
    styleUrls: ['./task-view.component.scss'],
})
export class TaskViewComponent implements OnInit {
    // tslint:disable-next-line: variable-name
    private _task: ITask;
    public bids: IBid[];
    public currentPrice: number;
    // public owned: boolean;
    isloggedIn: boolean;
    location: ILocation;
    isVendor = false;
    isRateAccepted = false;
    isBidAccepted = false;

    faDollarSign = faDollarSign;
    faCheck = faCheck;
    faTimes = faTimes;
    faUserCircle = faUserCircle;
    faMapMarkedAlt = faMapMarkedAlt;
    faCalendar = faCalendar;
    faInfoCircle = faInfoCircle;
    faFileAlt = faFileAlt;

    @Input() currentUser: IUser;
    @Output() taskStatusChanged = new EventEmitter<ITask>();

    @Input()
    set task(task: ITask) {
        this._task = task;

        this.getGeoLocation(this.task.location);

        if (!task.photos) {
            this.taskService.enrichTasksWithPhotos([task]);
        }

        if (this.currentUser) {
            this.taskService.getTaskBids(this._task._id).subscribe(res => {
                this.bids = res.payload.data;
                this.taskService.enrichBids(this.bids);

                const myBids: IBid[] = [];

                this.bids.filter(f => {
                    if (f.user === this.currentUser._id.toString()) {
                        myBids.push(f);
                    }
                });

                myBids.filter(b => {

                    console.log(this.task.rate.amount)
                    console.log(b.rate.amount)

                    this.isBidAccepted = this.task.rate.amount === b.rate.amount;
                    if (this.isBidAccepted) { return; }
                });
            });
        }
    }

    get task(): ITask {
        return this._task;
    }

    constructor(
        private dialog: MatDialog,
        private locationService: LocationService,
        private notifier: NotificationService,
        public taskService: TaskService,
        private commService: CommunicationService,
        public authService: AuthService
    ) {}

    async ngOnInit(): Promise<void> {

        this.location = {
            latitude: -28.68352,
            longitude: -147.20785,
            mapType: 'normal',
            zoom: 5,
        };

        this.authService.isLoggedIn$.subscribe(status => {
            this.isloggedIn = status;
        });

        this.authService.loginUserSubject$.subscribe(user => {
            if (user) {
                this.isVendor = user.role.includes('vendor');
            }
        });
    }

    getGeoLocation(address: IAddress): void {
        const addressString = `${address.street}, ${address.city} ${address.state}, ${address.zipcode} ${address.country}`;

        this.locationService.getLocByAddress(addressString).subscribe(res => {
            const result = res.payload.data;

            this.location = {
                latitude: result.results[0].geometry.location.lat,
                longitude: result.results[0].geometry.location.lng,
                mapType: 'normal',
                zoom: 5,
            };
        });
    }

    handleAcceptOffer(): void {
        // raise a bid
        const bid: IBid = { task: this.task._id.toString(), user: this.currentUser._id.toString(),  message: 'Tasker has accepted task at current rate', rate: this.task.rate };
        this.taskService.saveBid(bid).subscribe(res => {

            console.log(`1--- ${this.isVendor} - ${this.isRateAccepted} ---`)

            this.isRateAccepted = true;

            console.log(`1--- ${this.isVendor} - ${this.isRateAccepted} ---`)
            this.notifier.showSuccess('Rate accepted. Bid submitted successfully!');
        });
    }

    handleCancelTask(): void {
        this.taskService.cancelTask(this.task._id).subscribe((resp) => {
            this.task.status = TaskStatus.cancelled;
            this.taskStatusChanged.emit(this.task);
            this.notifier.showSuccess('Task Cancelled!');
        });
    }

    handleEdit(): void {
    }

    handleBidSubmitted(bid: IBid): void {
        this.taskService.saveBid(bid).subscribe(res => {
            this.notifier.showSuccess('Bid submitted successfully!');
        });
    }

    handleBidAccepted(bid: IBid): void {
        this.taskService.acceptBid2(bid._id.toString(), bid.task).subscribe(_ => {
            const mail: IMail = {
                from: 'dapo.onawole@mgail.com',
                to: bid.userAccount.username,
                subject: 'dgiini task',
                body: 'your bid has been accepted!'
            };

            this.isBidAccepted = true;
            this.notifier.showSuccess('Bid has been accepted and confirmed!');

            this.commService.sendMail(mail).subscribe(__ => {
                this.notifier.showSuccess('Bidding tasker has been contacted!');
            });
        });
    }

    handleViewProfile(user: IUser): void {
        let dialogRef;

        this.authService.isLoggedIn$.subscribe(state => {
            if (state) {
                dialogRef = this.dialog.open(PubProfileComponent, {
                    height: '700px',
                    width: '1000px',
                    disableClose: true,
                    data: {
                        user
                    }
                });
            }
        });

        dialogRef.afterClosed().subscribe((result) => {});
    }
}
