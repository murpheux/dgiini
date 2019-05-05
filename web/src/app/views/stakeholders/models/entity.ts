import { EntityAddress } from './entity-address';

export class Entity
{
    id: string;
    name: string;
    acronym: string;
    email: string;
    telephone: string;
    region: string;
    industry_type: string;
    type: string;
    address1: EntityAddress;
    address2: EntityAddress;
    description: string;
}
