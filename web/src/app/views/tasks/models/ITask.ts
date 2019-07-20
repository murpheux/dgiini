import { IAddress } from './IAddress';
import { Guid } from 'guid-typescript';
import { SchedulerLike } from 'rxjs';

export enum TaskType { InPerson, Online }

export interface ITask {
    _id: Guid;
    title: string;
    description: string;
    category: string;
    client: ClientSlim;
    schedule: Schedule;
    location: IAddress;
    estimated_hours: number;
    time: number;
    rating: number;
    status: string;
    created: Date;
    taskType: TaskType;
    quote: Quotation;
    recur?: Recurrence;
    selected: boolean;
}

export class Task implements ITask {
    schedule: Schedule;
    taskType: TaskType;
    _id: Guid;
    title: string;
    description: string;
    category: string;
    client: { id: Guid; name: string; };
    location: IAddress;
    estimated_hours: number;
    time: number;
    rating: number;
    status: string;
    created: Date;
    quote: Quotation;
    recur?: Recurrence;
    selected: boolean;
}

export class Schedule {
    date: Date;
    time: number;
}

export class ClientSlim {
    id: Guid;
    name: string;
}

export class Quotation {
    unit: string;
    rate: number;
    currency: Currency;
}

export enum Currency {
    USD,
    CAD,
    GBP
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
