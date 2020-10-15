import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './index.comp';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { AuthGuard } from '../../services/authguard-service';
import { TableModule } from 'primeng/table';
import { SharedModule } from '../../shared/shared.module';
import { TabViewModule } from 'primeng/tabview';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CardModule } from 'primeng/card';
import { EditorModule } from 'primeng/editor';
import {MultiSelectModule} from 'primeng/multiselect';

export const routes: Routes = [

  {
    path: '',
    data: {
      code: 'dash'
    },
    //canActivate: [AuthGuard],
    component: DashboardComponent,
  }
];

@NgModule({
  imports: [
    FormsModule,
    SharedModule,
    ChartsModule,
    CommonModule,
    BsDropdownModule,
    TableModule,
    ButtonsModule.forRoot(),
    RouterModule.forChild(routes),
    TabViewModule,
    InputSwitchModule,
    CardModule,
    EditorModule,
    MultiSelectModule    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyBtOT1Cm3HOy0zltO2cgUZPwUJYopuoIdM'
    // })
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
