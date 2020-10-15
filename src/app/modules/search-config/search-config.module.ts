import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { SearchConfigRoutingModule } from './search-config-routing.module';
import { SearchConfigComponent } from './search-config/search-config.component';
import { TableModule } from 'primeng/table';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { PanelModule } from 'primeng/panel';

@NgModule({
  declarations: [SearchConfigComponent],
  imports: [
    CommonModule,
    SearchConfigRoutingModule,
    TableModule,
    FormsModule,
    DragDropModule,
    SharedModule,
    CheckboxModule,
    PanelModule
  ]
})
export class SearchConfigModule { }
