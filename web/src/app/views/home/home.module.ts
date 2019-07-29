import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CarouselComponent } from './carousel/carousel.component';
import { MaterialDesignModule } from 'src/app/material-design/material-design.module';
import { TasksModule } from '../tasks/tasks.module';
import { CustomersayComponent } from './customersay/customersay.component';
import { HowworksComponent } from './howworks/howworks.component';
import { ContactusComponent } from './contactus/contactus.component';

@NgModule({
  declarations: [
    HomeComponent,
    CarouselComponent,
    CustomersayComponent,
    HowworksComponent,
    ContactusComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    MaterialDesignModule,
    TasksModule
  ],
  exports: [
    HomeComponent,
  ]

})
export class HomeModule { }
