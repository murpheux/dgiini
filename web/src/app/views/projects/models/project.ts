import { StrategicObjective } from './strategic-objective';
import { Area } from './area';

export class Project {
   id: string;
   title: string;
   code: string;
   typeOfProjectId: number;
   projectTypeId: number;
   countryId: number;
   regionId: number;
   implementingAgencyId: string;
   executingAgencyId: string;
   areas: Area[];
   strategicObjectives: StrategicObjective[];
   expectedStartDate: string;
   durationUnit: string;
   spanPeriod: string;
   estimatedDuration: number;
   cost: string;
   outline: string;
   comment: string;
}
