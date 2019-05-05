import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReportComponent } from './report/report.component';
import { ProjectComponent } from './project/project.component';
import { WorkPLanComponent } from './work-plan/work-plan.component';
import { PayrollComponent } from './payroll/payroll.component';
import { ContactComponent } from './contact/contact.component';
import { ServiceRequestComponent } from './service-request/service-request.component';
import { TravelAuthorityComponent } from './travel-authority/travel-authority.component';
import { BudgetComponent } from './budget/budget.component';

@NgModule({
  declarations: [
    HomeComponent,
    ReportComponent,
    ProjectComponent,
    WorkPLanComponent,
    PayrollComponent,
    ContactComponent,
    ServiceRequestComponent,
    TravelAuthorityComponent,
    BudgetComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ],
  exports: [
    HomeComponent,
    ReportComponent,
    ProjectComponent,
    WorkPLanComponent,
    PayrollComponent,
    ContactComponent,
    ServiceRequestComponent,
    TravelAuthorityComponent,
    BudgetComponent
  ]

})
export class HomeModule { }
