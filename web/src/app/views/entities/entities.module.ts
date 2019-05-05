import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatTableModule } from '@angular/material';

import { EntitiesRoutingModule } from './entities-routing.module';
import { CreateComponent } from './components/create/create.component';
import { MaterialDesignModule } from 'src/app/material-design/material-design.module';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { EntitiesComponent } from './components/entities.component';
import { EntityService } from './services/entity.service';

@NgModule({
  declarations: [EntitiesComponent, CreateComponent],
  imports: [
    CommonModule,
    EntitiesRoutingModule,
    SharedModule,
    CoreModule,
    MaterialDesignModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [ ],
  exports: [EntitiesComponent, CreateComponent, MatTableModule, MatPaginatorModule, MatSortModule, MatProgressSpinnerModule],
  providers: [EntityService]
})
export class EntitiesModule { }
