import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import json from 'highlight.js/lib/languages/json';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { MaterialDesignModule } from 'src/app/material-design/material-design.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TasksModule } from '../tasks/tasks.module';
import { LoadingComponent } from '../user/components/loading/loading.component';
import { CallbackComponent } from '../user/pages/callback/callback.component';
import { UserModule } from '../user/user.module';
import { BannerComponent } from './components/banner/banner.component';
import { CustomersayComponent } from './components/customersay/customersay.component';
import { FaqComponent } from './components/faq/faq.component';
import { HowworksComponent } from './components/howworks/howworks.component';
import { NologinComponent } from './components/nologin/nologin.component';
import { VendorclientComponent } from './components/taskerclient/taskerclient.component';
import { YouSkilledComponent } from './components/you-skilled/you-skilled.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

export function hljsLanguages(): any {
    return [{ name: 'json', func: json }];
}

@NgModule({
    declarations: [
        HomeComponent,
        CustomersayComponent,
        HowworksComponent,
        CallbackComponent,
        LoadingComponent,
        VendorclientComponent,
        FaqComponent,
        YouSkilledComponent,
        BannerComponent,
        NologinComponent,
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        SharedModule,
        NgSelectModule,
        MaterialDesignModule,
        TasksModule,
        UserModule,
        HighlightModule,
    ],
    providers: [
        {
            provide: HIGHLIGHT_OPTIONS,
            useValue: {
                languages: hljsLanguages,
            },
        },
    ],
    exports: [HomeComponent],
})
export class HomeModule {}
