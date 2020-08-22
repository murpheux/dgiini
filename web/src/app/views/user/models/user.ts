import { IAddress } from '../../tasks/models/IAddress';
import { Guid } from 'guid-typescript';
import { IPhoto } from '../../tasks/models/IPhoto';

export interface IProfile {
    email: string;
    email_verfified: boolean;
    name: string;
    family_name: string;
    given_name: string;
    nickname: string;
    picture: string;
    sub: string;
    updated_at: string;
}

export interface IClaim {
    aud: string;
    email: string;
    email_verified: boolean;
    exp: number;
    family_name: string;
    given_name: string;
    iat: number;
    iss: string;
    locale: string;
    name: string;
    nickname: string;
    nonse: string;
    picture: string;
    sub: string;
    updated_at: string;
    __raw: string;
}

export interface IUser {
    _id: Guid;
    name: string;
    username: string;
    password?: string;
    source?: string;
    role: [];

    created?: Date;
    lastLogin?: Date;
    rating?: number;
    photo?: IPhoto;

    aboutMember?: string;
    joined?: Date;
}

export interface IUserClaim {
    name: string;
    picture: string;
}

export interface IMemberReview {
    client: IUser;
    comment: string;
    created: Date;
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
    skills: string[];
    picture: string;
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
