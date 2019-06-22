export interface IAddress {
    street: string;
    city: string;
    state: string;
    zipcode: string;
    country: string;
}


export class Address implements IAddress {
    street: string;    city: string;
    state: string;
    zipcode: string;
    country: string;
}
