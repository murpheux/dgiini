import { Guid } from 'guid-typescript';
import { IUser } from '../../user/models/user';
import { IAddress } from './IAddress';
import { IPhoto } from './IPhoto';
import { ITaskBid } from './ITaskBid';


export enum TaskType {
    InPerson,
    Online,
}

export interface ITask {
    _id?: Guid;
    title: string;
    description: string;
    category: string;
    client: Guid;
    clientUser?: IUser;
    scheduled_date: Date;
    location: IAddress;
    estimated_hours: number;
    created: Date;
    rate: Quotation;
    selected?: boolean;
    status?: string;
    lastbid?: ITaskBid;
    bidcount?: number;
    photos?: IPhoto[];
}

export class Quotation {
    unit: string;
    amount: number;
    currency: Currency;
    date: Date;
}

export enum Currency {
    USD = 'USD',
    CAD = 'CAD',
    GBP = 'GBP',
}

export enum RateUnit {
    Total,
    Hourly,
}

export enum Recurrence {
    Daily,
    Weekly,
    Monthly,
}
