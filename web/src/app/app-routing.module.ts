import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './views/corp/components/about/pageNotFound/pageNotFound.component';

const routes: Routes = [
    { path: 'home', redirectTo: '/', pathMatch: 'full' },
    {
        path: '',
        loadChildren: () =>
            import('./views/home/home.module').then((m) => m.HomeModule),
    },
    {
        path: 'browse',
        loadChildren: () =>
            import('./views/tasks/tasks.module').then((m) => m.TasksModule),
    },
    {
        path: 'user',
        loadChildren: () =>
            import('./views/user/user.module').then((m) => m.UserModule),
    },
    // {
    //     path: 'new',
    //     loadChildren: () =>
    //         import('./views/tasks/tasks.module').then((m) => m.TasksModule),
    // },
    {
        path: 'task',
        loadChildren: () =>
            import('./views/tasks/tasks.module').then((m) => m.TasksModule),
    },
    {
        path: 'corp',
        loadChildren: () =>
            import('./views/corp/corp.module').then((m) => m.CorpModule),
    },
    { path: '**', redirectTo: 'corp/404' },
    // { path: '404', component: PageNotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: false })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
