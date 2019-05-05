import { Component, OnInit } from '@angular/core';
import { DocxService } from '../services/docx-service';
import { ActivatedRoute } from '@angular/router';
import { ProDocService } from '../services/pro-doc.service';
import { ProjectViewModel } from '../../projects/models/project-view-model';
import { ProjectScheduleModel } from '../models/project-schedule-model.';
import { ProjectMonitoringModel } from '../models/project-monitoring-model';
import { ProjectLegalModel } from '../models/project-legal-model';
import { ProjectResourceModel } from '../models/project-resource-model';
import { ProjectBudgetModel } from '../models/project-budget-model';
import { BudgetService } from '../services/budget.service';
import { ResourceService } from '../services/resource.service';
import { ObjectiveService } from '../services/objective.service';
import { ContextService } from '../services/context.service';
import { ContextType } from '../models/context-type';
import { Context } from '../models/context';
import { Constants } from 'src/app/shared/models/constants';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  isLoading = true;
  projectCode: string;
  mapNameToId = new Map();

  constructor(private route: ActivatedRoute, private prodocService: ProDocService,
    private docxService: DocxService, private budgetService: BudgetService,
    private resourceService: ResourceService, private objectiveService: ObjectiveService,
    private contextService: ContextService) {
    this.route.params.subscribe(params => {
      this.projectCode = params['code'];
    });
  }

  ngOnInit() {
  }

  public export(): void {

    this.prodocService.getProjectByCode(this.projectCode).subscribe((projectResoult: any) => {
      const project: ProjectViewModel = <ProjectViewModel>projectResoult.data;

      this.prodocService.getScheduleByCode(this.projectCode).subscribe((scheduleResult: any) => {
        const projectSchedule: ProjectScheduleModel = <ProjectScheduleModel>scheduleResult.data;

        this.prodocService.getMonitoringByCode(this.projectCode).subscribe((monitoringResult: any) => {
          const projectMonitoring: ProjectMonitoringModel = <ProjectMonitoringModel>monitoringResult.data;

          this.prodocService.getLegalByCode(this.projectCode).subscribe((legalResult: any) => {
            const projectLegal: ProjectLegalModel = <ProjectLegalModel>legalResult.data;

            this.resourceService.getResourceByCode(this.projectCode).subscribe((resourceResult: any) => {
              const projectResource: ProjectResourceModel = <ProjectResourceModel>resourceResult.data;
              const isShortTerm: boolean = projectResource.period.toLowerCase() === 'short' ? true : false;
              const isLongTerm: boolean = !isShortTerm;

              this.budgetService.getBudgetByCode(this.projectCode).subscribe((budgetResult: any) => {
                const projectBudget: ProjectBudgetModel = <ProjectBudgetModel>budgetResult.data;

                this.prodocService.getProjectDurationUnits().subscribe((durationResult: any) => {
                  let durationUnitValue: string;
                  const durationUnits: any[] = durationResult.data;
                  for (const unit of durationUnits) {
                    if (unit.id === project.project.durationUnit) {
                      durationUnitValue = unit.name;
                      if (project.project.estimatedDuration > 1) {
                        durationUnitValue = `${durationUnitValue}s`;
                      }
                      break;
                    }
                  }

                  this.objectiveService.getObjective(this.projectCode).subscribe((objectiveResult: any) => {
                    const objectives = objectiveResult.data.objectives;

                    this.contextService.getProjectContextsByCode(this.projectCode).subscribe((contextResult: any) => {
                      const contexts = <Context[]>contextResult.data.contexts;
                      const contextTypes = <ContextType[]>contextResult.data.contextTypes;
                      this.buildMapping(contextTypes);

                      const formatter = new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 0
                      });

                      const data = {
                        PROJECT_CODE: project.project.code,
                        PROJECT_TITLE: project.project.title,
                        PROJECT_COST: formatter.format(Number(project.project.cost)),
                        EXECUTING_AGENCY: 'ICAO', // project.project.executingAgencyId,
                        ENTITY: 'abc', // project.project.implementingAgencyId,
                        DESIRED_START_DATE: this.convertDate(project.project.expectedStartDate),
                        INITIAL_PROJECT_DURATION: project.project.estimatedDuration,
                        DURATION_UNIT: durationUnitValue,
                        OUTLINE: project.project.outline,
                        TITLE: project.project.title,
                        ANNEX_NUMBER: projectLegal.annexNumber,
                        APPLICABLE_AGREEMENT: projectLegal.applicableAgreement,
                        SCHEDULE_NO_OF_WEEKS: projectSchedule.numberOfWeeks,
                        MONITORING_NO_OF_WEEKS: projectMonitoring.numberOfWeeks,
                        MONITORING_DATE: this.convertDate(projectMonitoring.reportDate.toString()),
                        MONITORING_MONTHS: projectMonitoring.numberOfMonths,
                        RESOURCE_IS_SHORT_TERM: isShortTerm,
                        RESOURCE_IS_LONG_TERM: isLongTerm,
                        RESOURCE_EXPERTS: [
                          {
                            'title': 'Engineer',
                            'assignmentDuration': '15 months'
                          },
                          {
                            'title': 'Project Manager',
                            'assignmentDuration': '8 months'
                          },
                          {
                            'title': 'Controller',
                            'assignmentDuration': '1 months'
                          },
                          {
                            'title': 'Auditor',
                            'assignmentDuration': '2 months'
                          }
                        ], // temporarily hardcode the resource_exports, needs to be refactored after implementing job description
                        BUDGET_OVERHEAD_RATE: projectBudget.overheadRate,
                        OBJECTIVES: objectives,
                        CONTEXT_BACKGROUNDS: this.buildContext(contexts, Constants.PRODOC_CONTEXT_BACKGROUND_TYPE),
                        CONTEXT_SCOPES: this.buildContext(contexts, Constants.PRODOC_CONTEXT_SCOPE_TYPE),
                        CONTEXT_STRATEGIES: this.buildContext(contexts, Constants.PRODOC_CONTEXT_STRATEGY_TYPE),
                        CONTEXT_OBJECTIVES: project.project.strategicObjectives
                      };
                      const output_file = `${Constants.PRODOC_EXPORT_FILE_NAME_PREFIX}_${this.projectCode}.docx`;
                      // tslint:disable-next-line:max-line-length
                      this.docxService.process(Constants.PRODOC_EXPORT_TEMPLATE_FILE__FOLDER_NAME, Constants.PRODOC_EXPORT_TEMPLATE_FILE_NAME, data, output_file);
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  }

  private convertDate(dateString: string): string {
    const date: Date = new Date(dateString);
    const year: string = date.getFullYear().toString();
    let month: string = (date.getMonth() + 1).toString();
    let day: string = date.getDate().toString();
    if (day.length === 1) {
      day = `0${day}`;
    }
    if (month.length === 1) {
      month = `0${month}`;
    }
    const fullDate = `${day}/${month}/${year}`;
    return fullDate;
  }

  private buildMapping(types: ContextType[]): void {
    if (types && types.length > 0 ) {
      types.forEach(t => {
        this.mapNameToId.set(t.name.toLowerCase(), t.id);
      });
    }
  }

  private buildContext(mixedContexts: Context[], type_string: string): Context[] {
    const contexts = mixedContexts.filter(m => ( this.mapNameToId.get(type_string) === m.type));
    const sortedArray = contexts.sort((sec1, sec2) => {
      if (sec1.orderNo > sec2.orderNo) {
        return 1;
      } else if (sec1.orderNo < sec2.orderNo) {
        return -1;
      } else {
        return 0;
      }
    });
    return sortedArray;
  }
}
