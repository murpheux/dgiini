import { IAddress } from './address';

export interface IBankInfo {
    accountNo: string;
    bankName: string;
    transitNo: string;
    insitutionNo: number;
    address: IAddress;
}
