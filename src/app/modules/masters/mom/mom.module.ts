import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MomComponent } from '../mom/mom.component'
import { FormsModule } from '@angular/forms';
import { SharedModule } from './../../../shared/shared.module';
import { CheckboxModule, DialogModule } from 'primeng/primeng';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TableModule } from 'primeng/table';
import { Prerequisite } from '../../../services/prerequisite';




const routes: Routes = [
  {

    path: '',
    data: {
      title: 'General'
    },
    children: [
      {
        path: '',
        component: MomComponent,
        canActivate: [Prerequisite],
        data: {
          title: '',
          code: 'gm'

        }
      }


    ]

  }
];

@NgModule({
  declarations: [MomComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(routes),
    CheckboxModule,
    DialogModule,
    ScrollPanelModule,
    TableModule,
  ]

})

export class MomModule { }
