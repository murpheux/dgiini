import { Component, OnInit, Input } from '@angular/core';
import { IMessage } from '../../models/message';

@Component({
    selector: 'app-message-view',
    templateUrl: './message-view.component.html',
    styleUrls: ['./message-view.component.scss']
})
export class MessageViewComponent implements OnInit {
    @Input() message: IMessage;

    constructor() { }

    ngOnInit() {
    }

    handleReply(messageid) {
    }
}
