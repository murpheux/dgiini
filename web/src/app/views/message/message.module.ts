import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageRoutingModule } from './message-routing.module';
import { MessageSenderComponent } from './components/message-sender/message-sender.component';
import { MessageListComponent } from './components/message-list/message-list.component';

@NgModule({
  declarations: [MessageSenderComponent, MessageListComponent],
  imports: [
    CommonModule,
    MessageRoutingModule
  ]
})
export class MessageModule { }
