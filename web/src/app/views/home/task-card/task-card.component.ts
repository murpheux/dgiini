import { Component, OnInit, Input } from '@angular/core';
import { ITask } from '../../tasks/models/ITask';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {
    @Input() task: ITask;

  constructor() { }

  ngOnInit() {
  }

}
