import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StakeholdersRoutingModule } from './stakeholders-routing.module';
import { StakeholdersComponent } from './components/stakeholders.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { MaterialDesignModule } from 'src/app/material-design/material-design.module';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';
import { StakeholderService } from './services/stakeholder.service';
import { DeleteStakeholderDialogComponent } from './components/edit/delete-dialog/delete-stakeholder-dialog.component';

@NgModule({
  declarations: [StakeholdersComponent, CreateComponent, EditComponent, DeleteStakeholderDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    MaterialDesignModule,
    StakeholdersRoutingModule
  ],
  entryComponents: [
    DeleteStakeholderDialogComponent,
  ],
  exports: [CreateComponent, EditComponent, StakeholdersComponent, DeleteStakeholderDialogComponent],
  providers: [StakeholderService]
})
export class StakeholdersModule { }
