import { Injectable } from '@angular/core';
import { DataService } from '../services/dataservice-service';
@Injectable({
    providedIn: 'root'
})
export class Momservice {
    private show: boolean = false;

    constructor(private dataservice: DataService) { }

    saveMom(req: any) {
        return this.dataservice.postHttpData('/mom', req);
    }

    getMom(req: any) {
        //return false;
        return this.dataservice.getHttpData('/mom', req);
    }

    getLanguage(req: any) {
        return this.dataservice.getHttpData('/getLanguages', req);
    }

}







