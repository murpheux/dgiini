import { Guid } from 'guid-typescript';
import { IUser } from '../../user/models/user';

export interface IReview {
    _id?: Guid;
    from: Guid;
    fromUser?: IUser;
    to: Guid;
    toUser?: IUser;
    rating: number;
    comment: string;
    date: Date;
}
