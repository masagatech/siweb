import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { LayoutComponent } from './add/add.component';
import { AssetModule } from '../asset/asset.module';
import { AddComponent } from '../asset/add/add.component';
import { ChipsModule } from 'primeng/chips';

const routes: Routes = [
  {

    path: '',
    data: {
      title: 'Layout'
    },
    children: [
      {
        path: 'add',
        component: LayoutComponent,
        //canActivate: [Prerequisite],
        data: {
          title: 'Add',
          code: 'laya'

        }
      },
      {
        path: 'view',
        //component: ViewComponent,
        //canActivate: [Prerequisite],
        data: {
          title: 'View',
          code: 'layv'

        }
      },
      {
        path: 'edit/:id',
        component: LayoutComponent,
        //canActivate: [Prerequisite],
        data: {
          title: 'Edit',
          code: 'laye'

        }
      }

    ]

  }
];

@NgModule({
  declarations: [LayoutComponent, AddComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(routes),
    ChipsModule
  ],
  exports: []
})

export class LayoutModule { }
