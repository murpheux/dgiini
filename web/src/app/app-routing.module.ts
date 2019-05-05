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
    path: 'projects',
    loadChildren: './views/projects/projects.module#ProjectsModule'
  },
  {
    path: 'entities',
    loadChildren: './views/entities/entities.module#EntitiesModule'
  },
  {
    path: 'prodoc',
    loadChildren: './views/pro-doc/pro-doc.module#ProDocModule'
  },
  {
    path: 'stakeholders',
    loadChildren: './views/stakeholders/stakeholders.module#StakeholdersModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
