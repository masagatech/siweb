import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AddComponent } from './add/add.component';
import { ChipsModule } from 'primeng/chips';
import { ViewComponent } from './view/view.component';
import { AssetListComponent } from '../asset/list/list.component';
import { TabPanel, DragDropModule, TabViewModule } from 'primeng/primeng';

const routes: Routes = [
  {

    path: '',
    data: {
      title: 'Playlist'
    },
    children: [
      {
        path: 'add',
        component: AddComponent,
        //canActivate: [Prerequisite],
        data: {
          title: 'Add',
          code: 'playa'

        }
      },
      {
        path: 'view',
        component: ViewComponent,
        //canActivate: [Prerequisite],
        data: {
          title: 'View',
          code: 'playv'

        }
      },
      {
        path: 'edit/:id',
        component: AddComponent,
        //canActivate: [Prerequisite],
        data: {
          title: 'Edit',
          code: 'playa'

        }
      }

    ]

  }
];

@NgModule({
  declarations: [AddComponent, ViewComponent, AssetListComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(routes),
    ChipsModule,
    TabViewModule,
    DragDropModule
  ],
  exports: [AssetListComponent]

})

export class PlaylistModule { }
