import { Component, OnInit, Input } from '@angular/core';
import { ITask } from '../../models/ITask';
import { MessageService } from '../../../message/services/message.service';
import { IMessage } from '../../../message/models/message';
import { AuthService } from 'src/app/views/user/services/auth.service';

@Component({
    selector: 'app-task-view',
    templateUrl: './task-view.component.html',
    styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {
    private _task: ITask;
    public messages: IMessage[];
    public currentUser: any;

    @Input()
    set task(task: ITask) {
        this._task = task;
        this.getTaskMessages();
    }

    get task(): ITask {
        return this._task;
    }

    constructor(
        private messageService: MessageService,
        private authService: AuthService
    ) { }

    ngOnInit() {

        this.authService.isLoggedIn().subscribe(islogin => {
            if (islogin) {
                this.authService.getCurrentUser().subscribe(user => {
                    this.currentUser = user;
                });
            }
        });
    }

    getTaskMessages() {
        this.messageService.getTaskMessages(this.task._id).subscribe(success => {
            this.messages = success.payload;

            // enrich
            const from = this.messages.map(message => message.from);
            this.messages.map(message => from.push(message.to));

            // distinct
            const messageUsers = from.filter((value, index, self) => self.indexOf(value) === index);
            this.authService.getUserList(messageUsers).subscribe(res => {
                this.messages.forEach(m => {
                    res.payload.filter(user => {
                        m.from = m.from === user._id ? user : m.from;
                    });
                });
            });
        });
    }

    handleMessageSent(message: IMessage) {
        message.sentdate = new Date();
        message.from = this.currentUser;

        this.messages.unshift(message);
    }

}
