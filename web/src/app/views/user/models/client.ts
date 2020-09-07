import { IAddress } from './address';
import { ICreditCard } from './creditcard';
import { IDateOfBirth } from './dateofbirth';
import { IUser } from './user';


export interface IClient extends IUser {
    address?: IAddress;
    email: string;
    phone: string;
    dob?: IDateOfBirth;
    creditCard?: ICreditCard;
    rating?: number;
    how_heard?: string;
    job_city?: string;
}
