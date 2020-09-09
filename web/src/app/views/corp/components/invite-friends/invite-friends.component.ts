import { Component, OnInit } from '@angular/core';
import { Invite } from '../../models/invite';

@Component({
    selector: 'app-invite-friends',
    templateUrl: './invite-friends.component.html',
    styleUrls: ['./invite-friends.component.scss']
})
export class InviteFriendsComponent implements OnInit {
    invites: Invite[] = [];

    constructor() { }

    ngOnInit(): void {
        this.invites.push({ name: '', email: '' });
    }

    addInvite(): void {
    }

    handleSaveInvites(): void {
    }

}
