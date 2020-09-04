import { Guid } from 'guid-typescript';

export interface IReview {
    _id?: Guid;
    comment: string;
}
