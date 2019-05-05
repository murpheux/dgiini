import { ProjectBudgetItem } from "./project-budget-item";

export class ProjectBudgetModel {
  id: number;
  projectCode: string;
  projectTitle: string;
  code: string;
  from: string;
  to: string;
  items: ProjectBudgetItem[];
  amount: number;
  duration: number;
  overheadRate: number;
}
