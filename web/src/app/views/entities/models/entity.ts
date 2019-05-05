import { ObjectBase } from 'src/app/shared/models/objectbase';
import { Address } from './address';
import { EntityType } from './entityType';
import { IndustryType } from './industryType';

export class Entity extends ObjectBase {
  accountNumber: string;
  name: string;
  acronym: string;
  countryId: number;
  country: string;
  regionId: number;
  entityTypeId: number;
  entityTypeName: string;
  industryTypeId: number;
  industryTypeName: string;
  description: string;
  address: Address = new Address();
  mailingAddress: Address =  new Address();
}
