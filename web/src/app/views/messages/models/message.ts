import { Guid } from 'guid-typescript';
import { IUser } from '../../user/models/user';

export interface IMessage {
    _id?: Guid;
    from: Guid;
    fromUser: IUser;
    to: Guid;
    toUser: IUser;
    task: Guid;
    replyto: Guid;
    message: string;
    attachments: [];
    sentdate: Date;
    isRead: boolean;
}
