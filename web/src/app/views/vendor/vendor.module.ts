import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecommendVendorComponent } from './components/recommend-vendor/recommend-vendor.component';
import { VendorCardComponent } from './components/vendor-card/vendor-card.component';
import { FeaturedVendorComponent } from './components/featured-vendor/featured-vendor.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { MaterialDesignModule } from 'src/app/material-design/material-design.module';



@NgModule({
    declarations: [RecommendVendorComponent, VendorCardComponent, FeaturedVendorComponent],
    imports: [
        CommonModule,
        SharedModule,
        CoreModule,
        MaterialDesignModule,
    ],
    exports: [RecommendVendorComponent, VendorCardComponent, FeaturedVendorComponent]
})
export class VendorModule { }
