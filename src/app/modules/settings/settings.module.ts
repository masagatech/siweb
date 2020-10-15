import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralComponent } from './general/general.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { SharedModule } from './../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { EditorModule } from 'primeng/editor';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { DataTablesModule } from 'angular-datatables';
import { AgGridModule } from 'ag-grid-angular';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { SettingsService } from '../../services/settings/settings.service';
import { RoleService } from '../../../app/services/role/role-service';
import { Momservice } from '../../services/mom-service';
import { ListboxModule } from 'primeng/listbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { LanguagesettingComponent } from './languagesetting/languagesetting.component';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ConfirmDialogModule } from 'primeng/primeng';
import {ColorPickerModule} from 'primeng/colorpicker';

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    TabMenuModule,
    DataTablesModule,
    SharedModule,
    FormsModule,
    EditorModule,
    TableModule,
    AgGridModule.withComponents([]),
    FileUploadModule,
    CalendarModule,
    CheckboxModule,
    ListboxModule,
    InputSwitchModule, ScrollPanelModule,
    ConfirmDialogModule,
    ColorPickerModule

  ],
  declarations: [GeneralComponent, SettingsComponent, LanguagesettingComponent],
  providers: [SettingsService, RoleService, Momservice]
})
export class SettingsModule { }
