import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                data: {
                    title: 'Masters'
                },
                children: [
                    {
                        path: 'mom', loadChildren: './mom/mom.module#MomModule'
                    }
                ]
            }
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MasterRoutingModule { }
