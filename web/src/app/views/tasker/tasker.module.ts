import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecommendTaskerComponent } from './components/recommend-tasker/recommend-tasker.component';
import { TaskerCardComponent } from './components/tasker-card/tasker-card.component';
import { FeaturedTaskerComponent } from './components/featured-tasker/featured-tasker.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { MaterialDesignModule } from 'src/app/material-design/material-design.module';



@NgModule({
    declarations: [RecommendTaskerComponent, TaskerCardComponent, FeaturedTaskerComponent],
    imports: [
        CommonModule,
        SharedModule,
        CoreModule,
        MaterialDesignModule,
    ],
    exports: [RecommendTaskerComponent, TaskerCardComponent, FeaturedTaskerComponent]
})
export class VendorModule { }
