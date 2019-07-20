import { Component, OnInit, Input } from '@angular/core';
import { IMessage } from '../../models/message';

@Component({
    selector: 'app-message-list',
    templateUrl: './message-list.component.html',
    styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {
    @Input() messages: IMessage[];

    constructor() { }

    ngOnInit() {
    }

}
