import { PerformanceIndicator } from './performance-indicator';
import { ProjectDeliverable } from './project-deliverable';

export class ProjectObjective {
  id: number;
  projectCode: string;
  sequenceNo: string;
  title: string;
  orderNo: number;
  performanceIndicators: PerformanceIndicator[] = [];
  deliverables: ProjectDeliverable[] = [];
}
