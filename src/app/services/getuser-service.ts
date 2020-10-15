import { Injectable } from '@angular/core';
import { DataService } from '../services/dataservice-service'
@Injectable()
export class GetuserService {
    private show: boolean = false;

    constructor(private dataservice: DataService) { }


    getUser(req: any) {
        
        return this.dataservice.getHttpData('/getUser', req);
    }
   

}
