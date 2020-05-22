import { Guid } from 'guid-typescript';

export interface ITaskBid {
    id?: Guid;
    user: Guid;
    task: Guid;
    amount: number;
    created?: Date;
    accepted?: boolean;
}
