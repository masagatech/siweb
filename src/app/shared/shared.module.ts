import { NgModule } from '@angular/core';
import {
    AppBreadcrumbModule
} from '@coreui/angular';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';
import { ActionBarComponent } from '../modules/usercontrols/actionbar/actbar.comp';
import { AdvanceSearchComponent } from "../modules/usercontrols/advancesearch/advancesearch.comp";
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { GroupByPipe } from '../pipes/groupby.pipe';
import { NumberDirective } from '../directives/numbers-only.directive';
import { ModalModule } from 'ngx-bootstrap/modal';
import { OnCreateInit } from '../directives/oninit.directive';
import { GridComponent } from '../modules/usercontrols/grid/grid.comp';
import { MultiSelectModule } from 'primeng/primeng';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { FilterPipe } from '../pipes/filterby.pipe';
import { RouterModule } from '@angular/router';
import { OrderBy } from '../pipes/orderby.pipe';
import { TooltipModule } from 'primeng/tooltip';
import { TwoDigitDecimaNumberDirective } from '../directives/two-digit-decima-number.directive';
import { environment } from '../../environments/environment';
import { ProgressComponent } from '../modules/usercontrols/progress/progress.component';
import { DndDirective } from '../directives/dnd.directive';
import { UploaderComponent } from '../modules/usercontrols/uploader/uploader.component';


export function createTranslateLoader() {

}
export function HttpLoaderFactory(http: HttpClient) {
    let url = environment.api_root;
    return new TranslateHttpLoader(http, url + '/getLanguage/get/', '');
}
@NgModule({
    declarations: [ActionBarComponent, AdvanceSearchComponent, GroupByPipe, FilterPipe, NumberDirective, OnCreateInit,
        GridComponent, OrderBy, TwoDigitDecimaNumberDirective, DndDirective, UploaderComponent, ProgressComponent],
    imports: [
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            },
        }),
        AppBreadcrumbModule.forRoot(),
        ToastrModule.forRoot({
            positionClass: 'toast-top-center',
            preventDuplicates: true,
        }),
        ModalModule.forRoot(),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TableModule,
        CalendarModule,
        AutoCompleteModule,
        MultiSelectModule,
        ScrollPanelModule,
        RouterModule,
        TooltipModule
    ],
    exports: [HttpClientModule, AppBreadcrumbModule, TranslateModule, ToastrModule,
        ActionBarComponent, AdvanceSearchComponent, NumberDirective, GroupByPipe,
        FilterPipe, OnCreateInit, GridComponent, ScrollPanelModule, OrderBy,
        TooltipModule, TwoDigitDecimaNumberDirective, UploaderComponent, ProgressComponent,DndDirective],
    providers: [ToastrService]
})
export class SharedModule { }
