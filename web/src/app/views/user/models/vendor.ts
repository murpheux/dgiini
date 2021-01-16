import { IPhoto } from '../../tasks/models/photo';
import { IBankInfo } from './bankinfo';
import { IClient } from './client';

export interface IVendor extends IClient {
    bankAccount?: IBankInfo;
    jobDonePhotos?: IPhoto[];
    qualifications?: string[];
    residentCity?: string;
    skill_summary?: string;
    skills?: string[];
    sin?: string;
    rating?: number;
    selected?: boolean;
}
