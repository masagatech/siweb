import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MomComponent } from './mom/mom.component';
import { MasterRoutingModule } from '../../modules/masters/master-routing.module';
import { TableModule } from 'primeng/table';
import { DataTablesModule } from 'angular-datatables';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

import { Momservice } from '../../services/mom-service';
import { AgGridModule } from 'ag-grid-angular';
import { SharedModule } from './../../shared/shared.module';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { MasterserviceService } from '../../services/master/masterservice.service';
import { CheckboxModule } from 'primeng/checkbox';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CardModule } from 'primeng/card';


// import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@NgModule({
  imports: [
    TableModule,
    CommonModule,
    MasterRoutingModule,
    DataTablesModule,
    DropdownModule,
    FormsModule,
    CalendarModule,
    SharedModule,
    ScrollPanelModule,
    AutoCompleteModule,
    CheckboxModule,
    CardModule,

    AgGridModule.withComponents([])
  ],
  declarations: [],
  providers: [Momservice, MasterserviceService]
})
export class MastersModule { }
