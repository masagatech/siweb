import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { AddComponent } from './add/add.component';
import { ChipsModule } from 'primeng/chips';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {

    path: '',
    data: {
      title: 'Asset'
    },
    children: [
      {
        path: 'add',
        component: AddComponent,
        //canActivate: [Prerequisite],
        data: {
          title: 'Add',
          code: 'asseta'

        }
      },
      {
        path: 'view',
        component: ViewComponent,
        //canActivate: [Prerequisite],
        data: {
          title: 'View',
          code: 'assetv'

        }
      },
      {
        path: 'edit/:id',
        component: AddComponent,
        //canActivate: [Prerequisite],
        data: {
          title: 'Edit',
          code: 'asseta'

        }
      }

    ]

  }
];

@NgModule({
  declarations: [AddComponent, ViewComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(routes),
    ChipsModule
  ],
  //exports: [AddComponent],
  //entryComponents: [AddComponent]

})

export class AssetModule { }
