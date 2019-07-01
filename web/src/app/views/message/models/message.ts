import { ITask } from '../../tasks/models/ITask';

export interface IMessage {
    from: string;
    to: string[];
    message: string;
    attachement: any[];
    task: ITask;
    attachment: IMessageAttachement[];
}

export interface IMessageAttachement {
    filename: string;
    content: any;
    encoding: string;
    contentType: string;
}
