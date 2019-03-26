import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';


@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"]
})
export class CreateComponent implements OnInit {
  taskFormGroup: FormGroup;
  model: Task;

  constructor(
    private formBuilder: FormBuilder,
    private service: TaskService,
    private router: Router
  ) {
    this.initializeContent();
    this.buildForms();
  }

  initializeContent() {
    this.model = new Task();

  }

  buildForms() {
    this.taskFormGroup = this.formBuilder.group({
      id: this.formBuilder.control(this.model.id, [
        Validators.required
      ]),
      title: this.formBuilder.control(this.model.title, [
        Validators.required
      ]),
      amount: this.formBuilder.control(this.model.amount, [
        Validators.required
      ]),
      category: this.formBuilder.control(
        this.model.category,
        [Validators.required]
      ),
      client: this.formBuilder.control(
        this.model.client,
        [Validators.required]
      )
    });
  }

  ngOnInit() { }

  handleCancel() {
    this.router.navigate(["task"]);
  }

  handleBack() {
    this.router.navigate(["task"]);
  }

  handleUpdateBudget() {
    this.model.id = this.taskFormGroup.value.id;
    this.model.title = this.taskFormGroup.value.title;
    this.model.category = this.taskFormGroup.value.category;
    this.model.amount = this.taskFormGroup.value.amount;
    this.model.client = this.taskFormGroup.value.client;

    this.service.saveTask(this.model).subscribe(d => {
      this.model = null;
      this.router.navigate(["task"]);
    });
  }
}
