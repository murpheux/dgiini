import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-budget-expenditure-scale',
  templateUrl: './budget-expenditure-scale.component.html',
  styleUrls: ['./budget-expenditure-scale.component.scss']
})
export class BudgetExpenditureScaleComponent implements OnInit {
  @Input() tag: string;
  @Input() expenditures: 0;
  @Input() funding: 0;
  constructor() { }

  ngOnInit() {
  }

}
