import { ITask } from '../../tasks/models/ITask';
import { Guid } from 'guid-typescript';

export interface IMessage {
    from: any;
    to: Guid;
    message: string;
    sentdate?: Date;
    task: Guid;
    attachment?: IMessageAttachement[];
}

export interface IMessageAttachement {
    filename: string;
    content: any;
    encoding: string;
    contentType: string;
}
