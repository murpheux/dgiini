import { ProjectActivity } from './project-activity';

export class ProjectDeliverable {
  id: number;
  sequenceNo: string;
  title: string;
  orderNo: number;
  activities: ProjectActivity[] = [];
}
