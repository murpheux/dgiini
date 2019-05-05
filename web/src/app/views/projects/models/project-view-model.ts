import { Project } from './project';
import { StrategicObjective } from './strategic-objective';
import { Area } from './area';

export class ProjectViewModel {
  project: Project = new Project();
  areas: Area[];
  strategicObjectives: StrategicObjective[];
}
