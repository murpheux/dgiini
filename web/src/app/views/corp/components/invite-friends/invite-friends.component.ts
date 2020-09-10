import { Component, OnInit } from '@angular/core';
import { IMail } from 'src/app/shared/models/mail';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { CommunicationService } from '../../../../shared/services/communication.service';
import { Invite } from '../../models/invite';

@Component({
    selector: 'app-invite-friends',
    templateUrl: './invite-friends.component.html',
    styleUrls: ['./invite-friends.component.scss']
})
export class InviteFriendsComponent implements OnInit {
    invites: Invite[] = [];

    constructor(
        private commService: CommunicationService,
        private notificationService: NotificationService
    ) { }

    ngOnInit(): void {
        this.invites.push({ name: '', email: '' });
    }

    addInvite(): void {
        this.invites.push({name: '', email: ''});
    }

    deleteInvite(index): void {
        this.invites.splice(index, 1);
    }

    handleContactInvites(): void {
        this.invites.forEach(invite => {
            const mail: IMail = {
                from: 'dapo.onawole@mgail.com',
                to: invite.email,
                subject: 'dgiini invite',
                body: 'you have been invited!'
            };

            this.commService.sendMail(mail).subscribe(res => {
                this.notificationService.showSuccess(`${invite.name} has been contacted!`);

                this.invites = [{name: '', email: ''}];
            });
        });
    }

}
