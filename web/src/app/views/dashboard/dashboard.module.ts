import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { BudgetExpenditureScaleComponent } from './budget-expenditure-scale/budget-expenditure-scale.component';

@NgModule({
  declarations: [DashboardComponent, BudgetExpenditureScaleComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ],
  exports: [DashboardComponent, BudgetExpenditureScaleComponent]
})
export class DashboardModule { }
