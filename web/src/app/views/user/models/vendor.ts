import { IPhoto } from '../../tasks/models/IPhoto';
import { IBankInfo } from './bankinfo';
import { IClient } from './client';
import { ICreditCard } from './creditcard';
import { ISocial } from './social';
import { IVehicle } from './vehicle';

export interface IVendor extends IClient {
    bankAccount?: IBankInfo;
    creditCard?: ICreditCard;
    jobDonePhotos?: IPhoto[];
    vehicles?: IVehicle[];
    qualifications?: string[];
    residentCity?: string;
    skill_summary?: string;
    skills?: string[];
    sin?: string;
    rating?: number;
    selected?: boolean;
    social?: ISocial;
}
