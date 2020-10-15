import { Injectable } from '@angular/core';
import { DataService } from '../services/dataservice-service';
@Injectable()
export class Dispensaryservice {
    private show: boolean = false;

    constructor(private dataservice: DataService) { }

    saveDispensary(req: any) {
        return this.dataservice.postHttpData('/dispensary', req);
    }

    getDispensary(req: any) {
        //return false;
        return this.dataservice.getHttpData('/dispensary', req);
    }



}







