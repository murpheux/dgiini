import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageRoutingModule } from './message-routing.module';
import { MessageSenderComponent } from './components/message-sender/message-sender.component';
import { MessageListComponent } from './components/message-list/message-list.component';
import { MessageService } from './services/message.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { MaterialDesignModule } from 'src/app/material-design/material-design.module';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { MessageViewComponent } from './components/message-view/message-view.component';

@NgModule({
  declarations: [MessageSenderComponent, MessageListComponent, MessageViewComponent],
  imports: [
    CommonModule,
    MessageRoutingModule,
    SharedModule,
    CoreModule,
    MaterialDesignModule,
    NgxUiLoaderModule,
  ],
  exports: [MessageSenderComponent, MessageListComponent],
providers: [MessageService]
})
export class MessageModule { }
