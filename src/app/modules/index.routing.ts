import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexLayoutComponent } from './index.component';
import { P500Component } from '../error/500.component';

export const routes: Routes = [

    {
        path: '',
        component: IndexLayoutComponent,
        //canActivate:[AppguardGuard],
        children: [
            {
                path: '',
                children: [{
                    path: 'user', loadChildren: './usermaster/usermaster.module#UsermasterModule',
                }, {
                    path: 'settings', loadChildren: './settings/settings.module#SettingsModule',
                }, {
                    path: 'dashboard', loadChildren: './dashboard/index.module#DashboardModule',
                },
                {
                    path: 'masters', loadChildren: './masters/masters.module#MastersModule',
                },
                {
                    path: 'asset', loadChildren: './asset/asset.module#AssetModule',
                },
                {
                    path: 'playlist', loadChildren: './playlist/playlist.module#PlaylistModule',
                },
                {
                    path: 'layout', loadChildren: './layout/layout.module#LayoutModule',
                },
                {
                    path: '500',
                    component: P500Component,
                    data: {
                        title: 'Page 500'
                    }
                }
                ]
            }
        ]
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppModuleRoutingModule { }
