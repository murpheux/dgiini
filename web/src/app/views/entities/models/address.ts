import { ObjectBase } from 'src/app/shared/models/objectbase';

export class Address extends ObjectBase {
  line1: string;
  line2: string;
  city: string;
  stateOrProvince: string;
  postalcode: string;
  country: string;
}
