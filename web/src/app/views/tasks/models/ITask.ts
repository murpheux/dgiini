import { Guid } from 'guid-typescript';

import { IAddress } from './IAddress';
import { ITaskBid } from './ITaskBid';
import { IPhoto } from './IPhoto';

export enum TaskType { InPerson, Online }

export interface ITask {
    _id?: Guid;
    title: string;
    description: string;
    category: string;
    client: ClientSlim;
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


export class ClientSlim {
    id: Guid;
    name: string;
    photo?: string;
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
    GBP = 'GBP'
}

export enum RateUnit {
    Total,
    Hourly
}

export enum Recurrence {
    Daily,
    Weekly,
    Monthly
}
