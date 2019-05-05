import { MatStepper } from '@angular/material/stepper';
import { ResourceService } from './services/resource.service';
import { ContextService } from './services/context.service';
import { BudgetService } from './services/budget.service';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProDocRoutingModule } from "./pro-doc-routing.module";
import { DetailsComponent } from "./components/details.component";
import { SharedModule } from "src/app/shared/shared.module";
import { CoreModule } from "src/app/core/core.module";
import { MaterialDesignModule } from "src/app/material-design/material-design.module";
import { ProjectObjectivesComponent } from "./components/project-objectives/project-objectives.component";
import { ProjectResourcesComponent } from "./components/project-resources/project-resources.component";
import { ProjectPrerequisitesComponent } from "./components/project-prerequisites/project-prerequisites.component";
import { ProjectSchedulesComponent } from "./components/project-schedules/project-schedules.component";
import { ProjectBudgetComponent } from "./components/project-budget/project-budget.component";
import { ProjectRisksComponent } from "./components/project-risks/project-risks.component";
import { JobDescriptionComponent } from "./components/job-description/job-description.component";
// tslint:disable-next-line:max-line-length
import { ProjectMonitoringReviewReportingComponent } from "./components/project-monitoring-review-reporting/project-monitoring-review-reporting.component";
import { HandoverAndDeliverableComponent } from "./components/handover-and-deliverable/handover-and-deliverable.component";
import { RolesAndResponsibilitiesComponent } from "./components/roles-and-responsibilities/roles-and-responsibilities.component";
import { ProDocService } from "./services/pro-doc.service";
import { ProjectContextComponent } from "./components/project-context/project-context.component";
import { DocxService } from './services/docx-service';
import { ProjectRuleAndEgulationsComponent } from "./components/project-rule-and-egulations/project-rule-and-egulations.component";
import { LegalFrameworksComponent } from "./components/legal-frameworks/legal-frameworks.component";
import { ObjectiveService } from './services/objective.service';
@NgModule({
  declarations: [
    DetailsComponent, ProjectObjectivesComponent, ProjectContextComponent,
    ProjectObjectivesComponent,
    ProjectResourcesComponent,
    ProjectPrerequisitesComponent,
    ProjectSchedulesComponent,
    ProjectBudgetComponent,
    RolesAndResponsibilitiesComponent,
    ProjectRuleAndEgulationsComponent,
    LegalFrameworksComponent,
    ProjectRisksComponent,
    JobDescriptionComponent,
    ProjectMonitoringReviewReportingComponent,
    HandoverAndDeliverableComponent,
    RolesAndResponsibilitiesComponent,
    ProjectContextComponent
  ],
  imports: [
    CommonModule,
    ProDocRoutingModule,
    SharedModule,
    CoreModule,
    MaterialDesignModule
  ],
  exports: [DetailsComponent, ProjectObjectivesComponent, ProjectContextComponent,
    DetailsComponent,
    ProjectObjectivesComponent,
    ProjectResourcesComponent,
    ProjectSchedulesComponent,
    ProjectBudgetComponent,
    ProjectRisksComponent,
    ProjectContextComponent,
    JobDescriptionComponent,
    ProjectMonitoringReviewReportingComponent,
    HandoverAndDeliverableComponent,
    RolesAndResponsibilitiesComponent
  ],
  providers: [ProDocService, DocxService, ObjectiveService, BudgetService, ContextService, ResourceService, MatStepper],
})
export class ProDocModule { }
