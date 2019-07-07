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
    @Input() task: ITask;
    public messages: IMessage[];
    public currentUser: any;

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

        // TODO: change to logon user id
        this.messageService.getTaskMessages(this.task._id).subscribe(success => {
            this.messages = success.payload;
        });

    }

}
