import { Context } from './context';

export class ProjectContextModel {
  id: number;
  projectCode: string;
  projectScopes: Context[] = [];
  backgrounds: Context[] = [];
  implementationStrategies: Context[] = [];

}
