import { Address } from 'src/app/views/tasks/models/IAddress';
import { Guid } from 'guid-typescript';

export interface IProfile {
    _id: Guid;
    username: string;
    email: string;
    name: string;
    created: Date;
    address: Address;
    isActive: boolean;
    isBanned: boolean;
    lastLogin: Date;
    photo: string;
    client: IClient;
    rating: number;
    ratingcount: number;
    vendor: IVendor;
}

export interface IClient {
    credit_card: ICreditCard;
}

export interface IVendor {
    bank_info: IBankInstitute;
}

export interface ICreditCard {
    card_number: string;
    name_on_card: string;
    expiry: string;
    cv2: string;
    billing_address: Address;
}

export interface IBankInstitute {
    inst_name: string;
    transit_no: string;
    inst_code: string;
    branch_add: Address;
}
