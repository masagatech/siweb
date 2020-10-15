import { Pipe, PipeTransform } from '@angular/core';
const ordinals: string[] = ['th','st','nd','rd'];
@Pipe({ name: 'periodToText' })
export class PeriodToText implements PipeTransform {
    transform(data: any): any {
        if (data === '') { return false; }
        const a = data.split('.');
        let year = a[0];
        let month = 0;
        if (a.length > 0) {
            month = parseInt(a[1]);
        }

        let v = year % 100;
        let keepNumber=false;
        let lbl =(keepNumber?year:'') + (ordinals[(v-20)%10]||ordinals[v]||ordinals[0]);

        if (month < 12 && month > 0) {
            return (year > 0) ? year + ((year>1)?' years ':' year ') + month + ((month > 1) ? ' months' : ' month') : month + ((month > 1) ? ' months' : ' month');
        }
        else {
            return year + ((year>1)? lbl+' years':lbl+' year');
        }
    }
}