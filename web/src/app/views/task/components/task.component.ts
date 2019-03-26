import { Component, OnInit } from "@angular/core";
import { Task } from "../models/task";
import { TaskService } from "../services/task.service";

@Component({
  selector: "app-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.scss"]
})
export class TaskComponent implements OnInit {
  model = [];

  constructor(private service: TaskService) {}

  ngOnInit() {
    this.service.getTasks().subscribe((result: any) => {
      this.model = result.payload as Task[];
    });
  }
}
