import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CarouselComponent } from './carousel/carousel.component';
import { TaskCategoryNodeComponent } from './task-category-node/task-category-node.component';
import { TaskShowcaseComponent } from './task-showcase/task-showcase.component';
import { MaterialDesignModule } from 'src/app/material-design/material-design.module';
import { TaskCardComponent } from './task-card/task-card.component';
import { TasksModule } from '../tasks/tasks.module';

@NgModule({
  declarations: [
    HomeComponent,
    CarouselComponent,
    TaskCategoryNodeComponent,
    TaskShowcaseComponent,
    TaskCardComponent
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
