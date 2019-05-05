import { ResourceExpert } from './project-resource-expert.';

export class ProjectResourceModel {
  id: number;
  entityName: string;
  period: string;
  description: string;
  expert: ResourceExpert[];
  projectCode: string;
}
