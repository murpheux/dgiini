import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { HeaderModule } from './header';
import { FooterModule } from './footer';

@NgModule({
    declarations: [LayoutComponent],
    imports: [
        CommonModule,
        HeaderModule,
        FooterModule,
        RouterModule,
    ],
    exports: [
        LayoutComponent
    ],
    bootstrap: [LayoutComponent]
})
export class UiModule { }
