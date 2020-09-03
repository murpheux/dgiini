import { IUser } from './user';

export interface IMemberReview {
    client: IUser;
    comment: string;
    created: Date;
}
