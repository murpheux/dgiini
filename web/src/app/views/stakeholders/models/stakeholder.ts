import { EntityAddress } from './entity-address';

export class Stakeholder
{
    /**
     *
     */
    constructor() {
      this.address = new EntityAddress();
    }

    id: string;
    accountid: string;
    salutation: string;
    role: string;
    firstname: string;
    lastname: string;
    middlename: string;
    email: string;
    phone: string;
    fax: string;
    address: EntityAddress;

    // subrole: string;
    // focalpoints: FocalPoint[];
    // signatories: string[];
    // project_officers: string[];
    // entity: string;
}
