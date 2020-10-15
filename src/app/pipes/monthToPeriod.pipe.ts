import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'monthToPeriod' })
export class MonthToPeriod implements PipeTransform {
    transform(inpMonths: any): any {
        let years = (inpMonths / 12 | 0);
        let months = (inpMonths % 12 | 0);
        let msg: any = '';
        msg += (years > 0) ? years + ((years > 1) ? ' years ' : ' year ') : '';
        msg += (months > 0) ? months + ((months > 1) ? ' months' : ' month') : '';
        return msg;
    }
}