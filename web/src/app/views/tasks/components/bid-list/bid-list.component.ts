import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUser } from 'src/app/views/user/models/user';
import { IBid } from '../../models/bid';

@Component({
    selector: 'app-bid-list',
    templateUrl: './bid-list.component.html',
    styleUrls: ['./bid-list.component.scss']
})
export class BidListComponent implements OnInit {
    // tslint:disable-next-line: variable-name
    _bids: IBid[];

    @Input()
    set bids(bids: IBid[]) {
        this._bids = bids;

        let status = false;
        if (this._bids) {
            this._bids.filter(b => {
                status = status || b.accepted;
            });

            this.isAccepted = status;
        }
    }
    @Output() bidAccepted = new EventEmitter();
    @Output() viewProfile = new EventEmitter();

    isAccepted: boolean;

    constructor() { }

    ngOnInit(): void {
    }

    handleAcceptBid(bid: IBid): void {
        this.isAccepted = true;
        bid.accepted = true;

        this.bidAccepted.emit(bid);
    }

    handleViewProfile(user: IUser): void {
        if (!user) { return; }

        this.viewProfile.emit(user);
    }

}
