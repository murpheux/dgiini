import { Guid } from 'guid-typescript';

export interface IMessage {
    _id?: Guid;
    from: Guid;
    to: Guid;
    message: string;
    sent: Date;
    isRead: boolean;
}
