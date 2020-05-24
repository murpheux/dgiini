import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IVendor } from 'src/app/views/user/models/user';

@Component({
  selector: 'app-tasker-card',
  templateUrl: './tasker-card.component.html',
  styleUrls: ['./tasker-card.component.scss']
})
export class TaskerCardComponent implements OnInit {
    @Input() tasker: IVendor;
    @Output() taskerSelected = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    ontaskercardclick() {
        this.taskerSelected.emit(this.tasker);
    }

}
