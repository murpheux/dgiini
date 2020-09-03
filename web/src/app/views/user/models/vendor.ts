import { IClient } from './client';
import { IBankInfo } from './bankinfo';
import { ICreditCard } from './creditcard';
import { IVehicle } from './vehicle';

export interface IVendor extends IClient {
    bankAccount?: IBankInfo;
    creditCard?: ICreditCard;
    jobDonePhotos?: [];
    vehicles?: IVehicle[];
    qualifications?: string[];
    residentCity?: string;
    skill_summary?: string;
    skills?: string[];
    sin?: string;
    rating?: number;

    selected?: boolean;
}
