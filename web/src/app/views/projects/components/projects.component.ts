import { Component, OnInit } from '@angular/core';
import { Project } from '../models/project';
import { ProjectService } from '../services/project.service';
import { ProjectsViewModel } from '../models/projects-view-model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  model: ProjectsViewModel;
  constructor(private service: ProjectService) { }

  ngOnInit() {
    this.service.getProjectLists().subscribe( (result: any) => {
      this.model =   result.data as ProjectsViewModel;
    });
  }
}
