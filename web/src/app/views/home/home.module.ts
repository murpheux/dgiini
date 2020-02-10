import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CarouselComponent } from './components/carousel/carousel.component';
import { MaterialDesignModule } from 'src/app/material-design/material-design.module';
import { TasksModule } from '../tasks/tasks.module';
import json from 'highlight.js/lib/languages/json';
import { CustomersayComponent } from './components/customersay/customersay.component';
import { HowworksComponent } from './components/howworks/howworks.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { CallbackComponent } from '../user/pages/callback/callback.component';
import { LoadingComponent } from '../user/components/loading/loading.component';
import { HighlightModule } from 'ngx-highlightjs';
import { VendorclientComponent } from './components/vendorclient/vendorclient.component';
import { FaqComponent } from './components/faq/faq.component';
import { YouSkilledComponent } from './components/you-skilled/you-skilled.component';
import { UserModule } from '../user/user.module';
import { BannerComponent } from './components/banner/banner.component';

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
    LoadingComponent,
    VendorclientComponent,
    FaqComponent,
    YouSkilledComponent,
    BannerComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    MaterialDesignModule,
    TasksModule,
    UserModule,
    HighlightModule.forRoot({
        languages: hljsLanguages
    }),
  ],
  exports: [
    HomeComponent
  ]

})
export class HomeModule { }
