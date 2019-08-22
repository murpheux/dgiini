import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CarouselComponent } from './carousel/carousel.component';
import { MaterialDesignModule } from 'src/app/material-design/material-design.module';
import { TasksModule } from '../tasks/tasks.module';
import json from 'highlight.js/lib/languages/json';
import { CustomersayComponent } from './customersay/customersay.component';
import { HowworksComponent } from './howworks/howworks.component';
import { ContactusComponent } from './contactus/contactus.component';
import { CallbackComponent } from '../user/pages/callback/callback.component';
import { ProfileComponent } from '../user/pages/profile/profile.component';
import { LoadingComponent } from '../user/components/loading/loading.component';
import { HighlightModule } from 'ngx-highlightjs';

export function hljsLanguages() {
    return [{ name: 'json', func: json }];
}

@NgModule({
  declarations: [
    HomeComponent,
    CarouselComponent,
    CustomersayComponent,
    HowworksComponent,
    ContactusComponent,
    CallbackComponent,
    ProfileComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    MaterialDesignModule,
    TasksModule,
    HighlightModule.forRoot({
        languages: hljsLanguages
    }),
  ],
  exports: [
    HomeComponent,
  ]

})
export class HomeModule { }
