import { Component, OnInit, Input } from '@angular/core';
import { ITask } from '../../models/ITask';
import { MessageService } from '../../../message/services/message.service';
import { IMessage } from '../../../message/models/message';
import { AuthService } from 'src/app/views/user/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { TaskOfferComponent } from '../task-offer/task-offer.component';

@Component({
    selector: 'app-task-view',
    templateUrl: './task-view.component.html',
    styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {
    private _task: ITask;
    public messages: IMessage[];
    public currentPrice: number;
    @Input() currentUser: any;

    @Input()
    set task(task: ITask) {
        this._task = task;

        if (this.currentUser) {
            this.getUserTaskMessages();
        } else {
            this.getTaskMessages();
        }
    }

    get task(): ITask {
        return this._task;
    }

    constructor(
        private messageService: MessageService,
        public dialog: MatDialog
    ) { }

    ngOnInit() {
        if (this.task.lastbid) {
            this.currentPrice = this.task.lastbid.amount;
        } else {
            this.currentPrice = this.task.rate.amount;
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
        });
        registerRef.afterClosed().subscribe(result => {});
    }

}
