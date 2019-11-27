import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { IMessage } from '../../models/message';
import { Guid } from 'guid-typescript';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { faPaperPlane, faTimes } from '@fortawesome/free-solid-svg-icons';
import { IUser } from 'src/app/views/user/models/user';

@Component({
    selector: 'app-message-sender',
    templateUrl: './message-sender.component.html',
    styleUrls: ['./message-sender.component.scss']
})
export class MessageSenderComponent implements OnInit {
    private _task: Guid;
    public messageInReply: IMessage;
    public mouseoverSave = false;

    faPaperPlane = faPaperPlane;
    faTimes = faTimes;

    @Input() from: Guid;
    @Input() to: Guid;
    @Input() currentUser: IUser;
    @Output() messageSent = new EventEmitter<IMessage>();

    @Input()
    set task(task: Guid) {
        this._task = task;
        this.message = '';
    }

    @Input()
    set messageToReply(message: IMessage) {
        this.messageInReply = message;
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
        const msg: IMessage = {
            from: this.from,
            to: this.to,
            message: this.message,
            task: this.task,
            replyto: this.messageInReply ? this.messageInReply._id : undefined,
        };

        this.messageService.sendMessageForTask(this.task, msg).subscribe(success => {
            this.message = '';
            this.messageSent.emit(msg);

            this.notification.showSuccess('message sent!');
        });

        this.messageInReply = undefined;
    }

    handleCancel() {
        this.message = '';
        this.messageInReply = undefined;
    }

}
