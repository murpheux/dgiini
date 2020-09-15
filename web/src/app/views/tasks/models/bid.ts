import { Guid } from 'guid-typescript';
import { IUser } from '../../user/models/user';
import { Quotation } from './task';

export interface IBid {
    _id?: Guid;
    user: string;
    userAccount?: IUser;
    task: string;
    rate: Quotation;
    message?: string;
    created?: Date;
    accepted?: boolean;
}
