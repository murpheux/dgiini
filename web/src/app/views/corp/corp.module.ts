import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CorpRoutingModule } from './corp-routing.module';
import { PageNotFoundComponent } from './components/about/pageNotFound/pageNotFound.component';
import { AboutComponent } from './components/about/about.component';
import { TocComponent } from './components/about/toc/toc.component';
import { PrivacyComponent } from './components/about/privacy/privacy.component';


@NgModule({
  declarations: [ AboutComponent, PageNotFoundComponent, PrivacyComponent, TocComponent ],
  imports: [
    CommonModule,
    CorpRoutingModule
  ],
  entryComponents: [ AboutComponent ],
  exports: []
})
export class CorpModule { }
