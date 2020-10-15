import { NgModule } from '@angular/core';
import { MonthToPeriod } from '../pipes/monthToPeriod.pipe';
import { PeriodToText } from '../pipes/periodtotext.pipe';

@NgModule({
    declarations: [PeriodToText, MonthToPeriod],
    exports: [PeriodToText, MonthToPeriod]
})

export class PipeModule { }