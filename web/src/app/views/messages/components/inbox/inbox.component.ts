import { Component, OnInit } from '@angular/core';
import { IMessage } from '../../models/message';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MessageService } from '../../services/message.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { UserService } from '../../../user/services/user.service';
import { IUser } from 'src/app/views/user/models/user';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {
    public conversations: IMessage[];
    public currentUser: IUser;
    public buddies: IUser[];
    public selectedUser: IUser;

    constructor(
        private messageService: MessageService,
        private authService: AuthService,
        private notifier: NotificationService,
        private userService: UserService,
    ) { }

    ngOnInit(): void {
        this.authService.loginUserSubject$.subscribe(user => {
            if (user) {
                this.currentUser = user;
                this.getUserConversations(user);
            }
        });
    }

    getUserConversations(user: IUser): void {
        this.messageService.getUserConversations(user._id).subscribe((success) => {
            const conversations = success.payload.data;

            // get distinct conversation buddy
            const userDuoList = conversations.map((m) => [m.from, m.to]);
            let userList = [].concat.apply([], userDuoList);
            userList = userList.filter((value, index, self) => self.indexOf(value) === index);

            // filter current user
            const filteredList = userList.filter( userid => userid != this.currentUser._id )

            this.userService.getUserList(filteredList).subscribe(res => {
                this.buddies = res.payload.data;
                this.selectedUser = this.buddies[0];

                this.conversations = conversations.filter( msg => msg.from === this.selectedUser._id ||msg.to == this.selectedUser._id)
                this.messageService.enrichMessagesWithUser(this.conversations);
            });

        });
    }

}
