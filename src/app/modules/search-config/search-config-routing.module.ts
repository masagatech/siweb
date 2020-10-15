import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchConfigComponent } from './search-config/search-config.component';
import { AuthGuard } from '../../services/authguard-service';

const routes: Routes = [
  {
    path: '',


    children: [
      {
        path: '',
        component: SearchConfigComponent,
        //canActivate: [AuthGuard],
        data: {
          title: 'Grid Configuration',
          code: '999'

        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SearchConfigRoutingModule { }
