import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faStar } from '@fortawesome/free-solid-svg-icons';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { CoreModule } from 'src/app/core/core.module';
import { MaterialDesignModule } from 'src/app/material-design/material-design.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { MessagesRoutingModule } from './messages-routing.module';
import { InboxComponent } from './components/inbox/inbox.component';
import { MessageService } from './services/message.service';


@NgModule({
    declarations: [
        InboxComponent
    ],
    imports: [
        CommonModule,
        MessagesRoutingModule,
        SharedModule,
        CoreModule,
        NgSelectModule,
        MaterialDesignModule,
        NgxUiLoaderModule,
        FontAwesomeModule,
    ],
    exports: [
        InboxComponent
    ]
})
export class MessagesModule { }
