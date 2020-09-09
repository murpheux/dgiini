import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { PageNotFoundComponent } from './components/about/pageNotFound/pageNotFound.component';
import { PrivacyComponent } from './components/about/privacy/privacy.component';
import { TocComponent } from './components/about/toc/toc.component';
import { InviteFriendsComponent } from './components/invite-friends/invite-friends.component';

const routes: Routes = [
    { path: '', component: AboutComponent },
    { path: 'about', component: AboutComponent },
    { path: 'privacy', component: PrivacyComponent },
    { path: 'invite', component: InviteFriendsComponent },
    { path: 'toc', component: TocComponent },
    { path: '**', redirectTo: '404' },
    { path: '404', component: PageNotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CorpRoutingModule {}
