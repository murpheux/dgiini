import { Guid } from 'guid-typescript';
import { IUser } from '../../user/models/user';
import { IAddress } from './address';
import { IBid } from './bid';
import { IPhoto } from './photo';


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
    status?: TaskStatus;
    acceptedbid?: IBid[];
    lastbid?: IBid;
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

export enum  TaskStatus {
    open = 'open',
    accepted = 'accepted',
    assigned = 'assigned',
    cancelled = 'cancelled',
    completed = 'completed'
}
