import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexLayoutComponent } from './index.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AppModuleRoutingModule } from './index.routing';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { FullCalendarModule } from 'ng-fullcalendar';


// import {FullCalendarModule} from 'primeng/fullcalendar';
// import {CalendarComponent} from "ap-angular2-fullcalendar";
// import { Options } from 'fullcalendar';


import {
  AppAsideModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';
import { SharedModule } from '../shared/shared.module';
import { AutoCompleteModule } from 'primeng/primeng';
import { P500Component } from '../error/500.component';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';

@NgModule({
  imports: [
    CommonModule,
    AppAsideModule,
    AppFooterModule,
    CalendarModule,
    AppHeaderModule,
    AppModuleRoutingModule,
    AppSidebarModule,
    AutoCompleteModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    SharedModule,
    DialogModule,
    FullCalendarModule,
    TableModule,
    CardModule
  ],
  declarations: [IndexLayoutComponent, P500Component]
})
export class IndexModule { }
