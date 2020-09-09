import { Component, Input, OnInit } from '@angular/core';
import { IBid } from '../../models/bid';

@Component({
    selector: 'app-bid-list',
    templateUrl: './bid-list.component.html',
    styleUrls: ['./bid-list.component.scss']
})
export class BidListComponent implements OnInit {
    @Input() bids: IBid[];

    constructor() { }

    ngOnInit(): void {
    }

}
