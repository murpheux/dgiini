import { IAddress } from './address';

export interface ICreditCard {
    cardNumber: string;
    nameOnCard: string;
    expiry: string;
    cv2: string;
    billingAddress?: IAddress;
}
