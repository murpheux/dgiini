import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUser } from '../../../user/models/user';
import { IBid } from '../../models/bid';
import { Currency, ITask, RateUnit } from '../../models/task';

@Component({
    selector: 'app-bid',
    templateUrl: './bid.component.html',
    styleUrls: ['./bid.component.scss']
})
export class BidComponent implements OnInit {
    @Output() bidSubmitted = new EventEmitter<IBid>();
    bid: IBid;
    units: (string | RateUnit)[];

    @Input() user: IUser;
    @Input() task: ITask;

    constructor(
    ) { }

    ngOnInit(): void {
        this.bid = { rate: {amount: 0, unit: 'Hourly', currency: Currency.CAD,
            date: new Date() }, user: this.user._id.toString(), task: this.task._id.toString(), message: '' };

        this.units = Object.values(RateUnit).splice(0, 2);
    }

    handlePostBid(): void {
        this.bid.task = this.task._id.toString();
        this.bid.user = this.user._id.toString();
        this.bidSubmitted.emit(this.bid);

        // reset
        this.bid = this.bid = { rate: {amount: 0, unit: 'Hourly', currency: Currency.CAD,
            date: new Date() }, user: this.user._id.toString(), task: this.task._id.toString(), message: '' };
    }

}
