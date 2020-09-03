import { Guid } from 'guid-typescript';

export interface IUser {
    _id?: Guid;
    name: string;
    username: string;
    password?: string;
    source?: string;
    picture?: string;
    role: string[];

    created?: Date;
    lastLogin?: Date;
    rating?: number;

    aboutMember?: string;
    joined?: Date;
}
