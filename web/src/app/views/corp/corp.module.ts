import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AboutComponent } from './components/about/about.component';
import { PageNotFoundComponent } from './components/about/pageNotFound/pageNotFound.component';
import { PrivacyComponent } from './components/about/privacy/privacy.component';
import { TocComponent } from './components/about/toc/toc.component';
import { InviteFriendsComponent } from './components/invite-friends/invite-friends.component';
import { CorpRoutingModule } from './corp-routing.module';


@NgModule({
    declarations: [
        AboutComponent,
        PageNotFoundComponent,
        PrivacyComponent,
        TocComponent,
        InviteFriendsComponent,
    ],
    imports: [CommonModule, CorpRoutingModule],
    entryComponents: [AboutComponent],
    exports: [InviteFriendsComponent],
})
export class CorpModule {}
