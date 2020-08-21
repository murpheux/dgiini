import { Component, OnInit, Input } from '@angular/core';
import { ITask } from '../../models/ITask';
import { MessageService } from '../../../message/services/message.service';
import { IMessage } from '../../../message/models/message';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { TaskService } from '../../services/task.service';
import { IUser } from 'src/app/views/user/models/user';
import {
    faDollarSign,
    faCheck,
    faTimes,
    faFileAlt,
    faUserCircle,
    faMapMarkedAlt,
    faCalendar,
    faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { ILocation } from 'src/app/shared/models/ILocation';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
    selector: 'app-task-view',
    templateUrl: './task-view.component.html',
    styleUrls: ['./task-view.component.scss'],
})
export class TaskViewComponent implements OnInit {
    // tslint:disable-next-line: variable-name
    private _task: ITask;
    public messages: IMessage[];
    public currentPrice: number;
    public owned: boolean;
    isloggedIn: boolean;
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
                this.owned =
                    ((task.client as unknown) as IUser)._id ===
                    this.currentUser._id;
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
    ) {}

    async ngOnInit(): Promise<void> {
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
            zoom: 5,
        };

        this.isloggedIn = await this.authService.isLoggedIn$.toPromise();
    }

    getUserTaskMessages(): void {
        this.messageService
            .getUserTaskMessages(this.task._id, this.currentUser._id)
            .subscribe((success) => {
                this.messages = success.payload.data;
                this.messageService.enrichMessages(this.messages);
            });
    }

    getTaskMessages(): void {
        this.messageService
            .getTaskMessages(this.task._id)
            .subscribe((success) => {
                this.messages = success.payload.data;
                // this.messageService.enrichMessages(this.messages);
            });
    }

    handleMessageSent(message: IMessage): void {
        message.sentdate = new Date();
        message.from = this.currentUser;

        this.messages.unshift(message);
    }

    handleMessagedToReply(message: IMessage): void {
        this.messageToReply = message;
    }

    handleAcceptOffer(): void {
        this.taskService.acceptBid(this.task.lastbid.id).subscribe((resp) => {
            this.notificationService.showSuccess('Offer accepted!');
        });
    }

    handleCancelTask(): void {
        this.taskService.cancelTask(this.task._id).subscribe((resp) => {
            this.notificationService.showSuccess('Task Cancelled!');
        });
    }
}
