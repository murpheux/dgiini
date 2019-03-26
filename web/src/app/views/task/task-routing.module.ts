import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CreateComponent } from "./components/create/create.component";
import { EditComponent } from "./components/edit/edit.component";
import { TaskComponent } from "./components/task.component";

const routes: Routes = [
  { path: "", component: TaskComponent },
  { path: "create", component: CreateComponent },
  { path: "edit/:id", component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule {}
