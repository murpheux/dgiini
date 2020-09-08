import { Guid } from 'guid-typescript';
import { IAddress } from './address';

export interface IUser {
    _id?: Guid;
    name?: string;
    firstname?: string;
    lastname?: string;
    username: string;
    password?: string;
    source?: string;
    picture?: string;
    role: string[];
    address?: IAddress;
    phone?: string;

    created?: Date;
    lastLogin?: Date;
    rating?: number;

    summary?: string;
    joined?: Date;
}
