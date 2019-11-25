import { IAddress } from '../../tasks/models/IAddress';
import { Guid } from 'guid-typescript';


export interface IUser {
    _id: Guid;
    name: string;
    username: string;
    password: string;
    source: string;

    created: Date;
    lastLogin: Date;
    rating: number;
    photo: [];
}

export interface IClient extends IUser {

    address: IAddress;
    email: string;
    creditCard: ICreditCard;
    rating: number;
}


export interface IVendor extends IUser {
    address: IAddress;
    email: string;
    bankAccount: IBankInfo;
    creditCard: ICreditCard;
    jobDonePhotos: [];
    vehicicle: IVehicle[];
    qualifications: string[];
    residentCity: string;
    skill_summary: string;
    sin: string;
    rating: number;

    selected: boolean;
}

export interface IBankInfo {
    accountNo: string;
    bankName: string;
    transitNo: string;
    insitutionNo: number;
    address: IAddress;
}

export interface ICreditCard {
    cardNumber: string;
    nameOnCard: string;
    expiry: string;
    cv2: string;
    billingAddress?: IAddress;
}

export interface IVehicle {
    brand: string;
    model: string;
    year: string;
    photos: [];
}
