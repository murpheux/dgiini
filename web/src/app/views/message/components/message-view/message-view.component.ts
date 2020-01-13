import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IMessage } from '../../models/message';
import { faReply } from '@fortawesome/free-solid-svg-icons';
import { Guid } from 'guid-typescript';
import { AuthService } from 'src/app/views/user/services/auth.service';

@Component({
    selector: 'app-message-view',
    templateUrl: './message-view.component.html',
    styleUrls: ['./message-view.component.scss']
})
export class MessageViewComponent implements OnInit {
    @Input() message: IMessage;
    @Output() messageToReply = new EventEmitter();

    faReply = faReply;

    constructor(
        private authService: AuthService
    ) { }

    ngOnInit() {
    }

    handleReply() {
        this.messageToReply.emit(this.message);
    }
}
