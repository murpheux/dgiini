import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IVendor } from 'src/app/shared/models/profile';

@Component({
  selector: 'app-vendor-card',
  templateUrl: './vendor-card.component.html',
  styleUrls: ['./vendor-card.component.scss']
})
export class VendorCardComponent implements OnInit {
    @Input() vendor: IVendor;
    @Output() vendorSelected = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    onvendorcardclick() {
        this.vendorSelected.emit(this.vendor);
    }

}
