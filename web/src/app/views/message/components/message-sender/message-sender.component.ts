import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { IMessage } from '../../models/message';
import { Guid } from 'guid-typescript';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
    selector: 'app-message-sender',
    templateUrl: './message-sender.component.html',
    styleUrls: ['./message-sender.component.scss']
})
export class MessageSenderComponent implements OnInit {
    private _task: Guid;
    public mouseoverSave = false;

    @Input() from: Guid;
    @Input() to: Guid;
    @Input() currentUser: any;
    @Output() messageSent = new EventEmitter<IMessage>();

    @Input()
    set task(task: Guid) {
        this._task = task;
        this.message = '';
    }

    get task(): Guid {
        return this._task;
    }

    message: string;

    constructor(
        private messageService: MessageService,
        public notification: NotificationService,
    ) { }

    ngOnInit() { }

    handleSubmit(formValues: any) {

        // update model
        const msg = <IMessage> {
            from: this.from,
            to: this.to,
            message: this.message,
            task: this.task
        };

        console.log(JSON.stringify(msg));
        this.messageService.sendMessageForTask(this.task, msg).subscribe(success => {
            this.message = '';
            this.messageSent.emit(msg);

            this.notification.showSuccess('message sent!');
        });
    }

    handleCancel() {
        this.message = '';
    }

}
