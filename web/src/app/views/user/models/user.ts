import { Address } from '../../tasks/models/IAddress';
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

    address: Address;
    email: string;
    creditCard: ICreditCard;
    rating: number;
}


export interface IVendor extends IUser {
    address: Address;
    email: string;
    bankAccount: IBankInfo;
    creditCard: ICreditCard;
    jobDonePhotos: [];
    vehicicle: IVehicle[];
    qualifications: string[];
    residentCity: string;
    skillsummary: string;
    sin: string;
    rating: number;

    selected: boolean;
}

export class Client implements IClient {
    created: Date;
    lastLogin: Date;
    photo;
    name: string;
    password: string;
    address: Address;    email: string;
    creditCard: ICreditCard;
    rating: number;
    _id: Guid;
    username: string;
    source: string;
}

export class Vendor implements IVendor {
    rating: number;
    lastLogin: Date;
    created: Date;
    photo;
    selected: boolean;
    name: string;
    password: string;
    address: Address;
    email: string;
    bankAccount: IBankInfo;
    creditCard: ICreditCard;
    jobDonePhotos;
    vehicicle: IVehicle[];
    qualifications: string[];
    residentCity: string;
    skillsummary: string;
    sin: string;
    _id: Guid;
    username: string;
    source: string;
}

export interface IBankInfo {
    accountNo: string;
    bankName: string;
    transitNo: string;
    insitutionNo: number;
    address: Address;
}

export interface ICreditCard {
    cardNumber: string;
    nameOnCard: string;
    expiry: string;
    cv2: string;
    billingAddress?: Address;
}

export class CreditCard implements ICreditCard {
    cardNumber: string;    nameOnCard: string;
    expiry: string;
    cv2: string;
    billingAddress?: Address;
}

export interface IVehicle {
    brand: string;
    model: string;
    year: string;
    photos: [];
}
