import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { UtilService } from './services/util.service';
import { CommingSoonComponent } from './components/comming-soon/comming-soon.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MaterialDesignModule } from '../material-design/material-design.module';

@NgModule({
  declarations: [LoaderComponent, CommingSoonComponent, ConfirmDialogComponent],
  exports: [LoaderComponent, CommingSoonComponent, ConfirmDialogComponent],
  providers: [UtilService],
  imports: [
    CommonModule,
    MaterialDesignModule
  ],
  entryComponents: [
    ConfirmDialogComponent,
  ],
})
export class SharedModule { }
