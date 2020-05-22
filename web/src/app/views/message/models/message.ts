import { ITask } from '../../tasks/models/ITask';
import { Guid } from 'guid-typescript';

export interface IMessage {
    _id?: Guid;
    // tslint:disable-next-line: no-any
    from: any;
    to: Guid;
    message: string;
    sentdate?: Date;
    replyto?: Guid;
    task: Guid;
    attachment?: IMessageAttachement[];
}

export interface IMessageAttachement {
    filename: string;
    // tslint:disable-next-line: no-any
    content: any;
    encoding: string;
    contentType: string;
}
