import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    { path: '', loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule) },
    { path: 'home', loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule) },
    { path: 'user', loadChildren: () => import('./views/user/user.module').then(m => m.UserModule) },
    { path: 'new', loadChildren: () => import('./views/tasks/tasks.module').then(m => m.TasksModule) },
    { path: 'mytask', loadChildren: () => import('./views/tasks/tasks.module').then(m => m.TasksModule) },
    { path: 'corp', loadChildren: () => import('./views/corp/corp.module').then(m => m.CorpModule) },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: false })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
