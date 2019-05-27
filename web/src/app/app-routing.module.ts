import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './views/home/home.module#HomeModule'
  },
  {
    path: 'home',
    loadChildren: './views/home/home.module#HomeModule'
  },
  {
    path: 'user',
    loadChildren: './views/user/user.module#UserModule'
  },
  {
    path: 'dashboard',
    loadChildren: './views/dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'new',
    loadChildren: './views/tasks/tasks.module#TasksModule'
  },
  {
    path: 'tasks',
    loadChildren: './views/tasks/tasks.module#TasksModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
