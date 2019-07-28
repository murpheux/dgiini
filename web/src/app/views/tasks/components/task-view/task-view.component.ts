import { Component, OnInit, Input } from '@angular/core';
import { ITask } from '../../models/ITask';
import { MessageService } from '../../../message/services/message.service';
import { IMessage } from '../../../message/models/message';
import { AuthService } from 'src/app/views/user/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { TaskOfferComponent } from '../task-offer/task-offer.component';
import { IProfile } from 'src/app/shared/models/profile';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { TaskService } from '../../services/task.service';

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
    @Input() currentUser: IProfile;

    @Input()
    set task(task: ITask) {
        this._task = task;

        if (this.currentUser) {
            this.getUserTaskMessages();

            if (task.client.id) {
                this.owned = task.client.id === this.currentUser._id;
            } else {
                this.owned = (task.client as unknown as IProfile)._id === this.currentUser._id;
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
    }

    getUserTaskMessages() {
        this.messageService.getUserTaskMessages(this.task._id, this.currentUser._id).subscribe(success => {
            this.messages = success.payload;
            this.messageService.enrichMessages(this.messages);
        });
    }

    getTaskMessages() {
        this.messageService.getTaskMessages(this.task._id).subscribe(success => {
            this.messages = success.payload;
            this.messageService.enrichMessages(this.messages);
        });
    }

    handleMessageSent(message: IMessage) {
        message.sentdate = new Date();
        message.from = this.currentUser;

        this.messages.unshift(message);
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
        console.log(this.task.lastbid);
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
