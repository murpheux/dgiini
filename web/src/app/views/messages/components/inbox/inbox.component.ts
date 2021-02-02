import { Component, OnInit } from '@angular/core';
import { IMessage } from '../../models/message'
import { AuthService } from 'src/app/shared/services/auth.service';
import { MessageService } from '../../services/message.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { IUser } from 'src/app/views/user/models/user';


@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {
    public conversations: IMessage[];
    public currentUser: IUser;

    constructor(
        private messageService: MessageService,
        private authService: AuthService,
        private notifier: NotificationService,
    ) { }

    ngOnInit(): void {
        this.authService.loginUserSubject$.subscribe(user => {
            if (user) {
                this.currentUser = user;
                taskid = '5d1cf62a8cda953115f07a30';
                this.getUserConversations(user, taskid);
            }
        });
    }

    getUserConversations(user: IUser): void {
        this.messageService.getUserConversations(user._id).subscribe((success) => {
            console.log(JSON.stringify(success.payload.data));
            this.conversations = success.payload.data;

        });
    }

    getUserMessages(user: IUser): void {
        this.messageService.getUserMessages(user._id).subscribe((success) => {
            this.conversations = success.payload.data;


        });
    }

}
