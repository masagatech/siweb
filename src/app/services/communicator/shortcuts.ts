import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ShorcutService {
    constructor() { }

    private sortCutShurce = new BehaviorSubject<number>(1);
    sortCutShurce$ = this.sortCutShurce.asObservable();


    showShortCutPanel(str) {

        this.sortCutShurce.next(str);
    }


}