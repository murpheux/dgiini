import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-rule-and-egulations',
  templateUrl: './project-rule-and-egulations.component.html',
  styleUrls: ['./project-rule-and-egulations.component.scss']
})
export class ProjectRuleAndEgulationsComponent implements OnInit {

  projectCode: string;
  constructor(private route: ActivatedRoute) {

    this.route.params.subscribe(params => {
      this.projectCode  = params['code'];
    });
  }

  ngOnInit() {
  }

}
