import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: "./views/home/home.module#HomeModule"
  },
  {
    path: "home",
    loadChildren: "./views/home/home.module#HomeModule"
  },
  {
    path: "dashboard",
    loadChildren: "./views/dashboard/dashboard.module#DashboardModule"
  },
  {
    path: "task",
    loadChildren: "./views/task/task.module#TaskModule"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
