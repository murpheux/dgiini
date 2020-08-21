import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { HeaderModule } from './header';
import { FooterModule } from './footer';
import { environment } from '../../environments/environment';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [LayoutComponent],
    imports: [CommonModule, HeaderModule, FooterModule, RouterModule],
    exports: [LayoutComponent],
    providers: [],
    bootstrap: [LayoutComponent],
})
export class UiModule {}
