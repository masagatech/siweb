import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleComponent } from './role/role.component';
import { AuthGuard } from '../../services/authguard-service';
import { Prerequisite } from '../../services/prerequisite';

import { from } from 'rxjs';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        data: {
          title: 'User'
        },
        children: [
          {
            path: 'role',
            component: RoleComponent,
            //canActivate: [AuthGuard],
            data: {
              title: 'Role',
              code: 'role'
            }
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

export class UsermasterRoutingModule { }
