import { Component, OnInit, Input } from '@angular/core';
import { ITask } from '../../models/ITask';
import { MessageService } from '../../../message/services/message.service';
import { IMessage } from '../../../message/models/message';
import { LocationService } from 'src/app/views/user/services/location.service';
import { MatDialog } from '@angular/material/dialog';
import { TaskOfferComponent } from '../task-offer/task-offer.component';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { TaskService } from '../../services/task.service';
import { IUser } from 'src/app/views/user/models/user';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faDollarSign, faCheck, faTimes, faFileAlt, faUserCircle, faMapMarkedAlt, faCalendar, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { AuthService } from 'src/app/views/user/services/auth.service';
import { ILocation } from 'src/app/shared/models/ILocation';

@Component({
    selector: 'app-task-view',
    templateUrl: './task-view.component.html',
    styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {
    private _task: ITask;
    public messages: IMessage[];
    public currentPrice: number;
    public owned: boolean;
    public messageToReply: IMessage;
    location: ILocation;

    faDollarSign = faDollarSign;
    faCheck = faCheck;
    faTimes = faTimes;
    faUserCircle = faUserCircle;
    faMapMarkedAlt = faMapMarkedAlt;
    faCalendar = faCalendar;
    faInfoCircle = faInfoCircle;
    faFileAlt = faFileAlt;

    @Input() currentUser: IUser;

    @Input()
    set task(task: ITask) {
        this._task = task;

        if (this.currentUser) {
            this.getUserTaskMessages();

            if (task.client.id) {
                this.owned = task.client.id === this.currentUser._id;
            } else {
                this.owned = (task.client as unknown as IUser)._id === this.currentUser._id;
            }
        } else {
            this.getTaskMessages();
        }

        if (this.task.lastbid) {
            this.currentPrice = this.task.lastbid.amount;
        } else {
            this.currentPrice = this.task.rate.amount;
        }
    }

    get task(): ITask {
        return this._task;
    }

    constructor(
        private messageService: MessageService,
        private dialog: MatDialog,
        private notificationService: NotificationService,
        private taskService: TaskService,
        public authService: AuthService
    ) { }

    ngOnInit() {
        if (this.task.lastbid) {
            this.currentPrice = this.task.lastbid.amount;
        } else {
            this.currentPrice = this.task.rate.amount;
        }

        if (this.currentUser) {
            this.owned = this._task.client.id === this.currentUser._id;
        }

        this.location = {
            latitude: -28.68352,
            longitude: -147.20785,
            mapType: 'normal',
            zoom: 5
        };
    }

    getUserTaskMessages() {
        this.messageService.getUserTaskMessages(this.task._id, this.currentUser._id).subscribe(success => {
            this.messages = success.payload.data;
            this.messageService.enrichMessages(this.messages);
        });
    }

    getTaskMessages() {
        this.messageService.getTaskMessages(this.task._id).subscribe(success => {
            this.messages = success.payload.data;
            this.messageService.enrichMessages(this.messages);
        });
    }

    handleMessageSent(message: IMessage) {
        message.sentdate = new Date();
        message.from = this.currentUser;

        this.messages.unshift(message);
    }

    handleMessagedToReply(message: IMessage) {
        this.messageToReply = message;
    }

    handleMakeOffer() {
        const registerRef = this.dialog.open(TaskOfferComponent, {
            height: '400px',
            width: '400px',
            data: { user: this.currentUser, task: this.task }
        });
        registerRef.afterClosed().subscribe(result => {
            this.currentPrice = this.task.lastbid.amount;
        });
    }

    handleAcceptOffer() {
        this.taskService.acceptBid(this.task.lastbid.id).subscribe(resp => {
            this.notificationService.showSuccess('Offer accepted!');
        });
    }

    handleCancelTask() {
        this.taskService.cancelTask(this.task._id).subscribe(resp => {
            this.notificationService.showSuccess('Task Cancelled!');
        });
    }

}
