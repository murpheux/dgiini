import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecommendVendorComponent } from './components/recommend-vendor/recommend-vendor.component';
import { VendorCardComponent } from './components/vendor-card/vendor-card.component';
import { FeaturedVendorComponent } from './components/featured-vendor/featured-vendor.component';



@NgModule({
  declarations: [RecommendVendorComponent, VendorCardComponent, FeaturedVendorComponent],
  imports: [
    CommonModule
  ]
})
export class VendorModule { }
