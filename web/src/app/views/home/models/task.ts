import { Guid } from 'guid-typescript';
import { IAddress } from '../../tasks/models/IAddress';

export interface ITask {
    id: Guid;
    title: string;
    description: string;
    client: IClient;
    rate: IRate;
    location: IAddress;
    estimated_hours: number;
    category: string;
}

export interface IClient {
    id: Guid;
    name: string;
}

export interface IRate {
    amount: number;
    currency: Currency;
    date: Date;
}

export enum Currency {
    USD,
    CAD,
    GBP,
    NGN,
}
