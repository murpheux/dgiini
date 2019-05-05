import { StakeholdersViewModel } from './../models/stakeholders-view-model';
import { StakeholderService } from './../services/stakeholder.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stakeholders',
  templateUrl: './stakeholders.component.html',
  styleUrls: ['./stakeholders.component.scss']
})
export class StakeholdersComponent implements OnInit {
  model = new StakeholdersViewModel();

  constructor(private service: StakeholderService) { }

  ngOnInit() {
    this.service.getStakeholderLists().subscribe( (result: any) => {
      this.model =   result.data as StakeholdersViewModel;

    });
  }

}
