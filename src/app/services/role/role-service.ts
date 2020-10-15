import { Injectable } from '@angular/core';
import { DataService } from '../dataservice-service';


@Injectable()
export class RoleService {

    constructor(private dataservice: DataService) { }

    getRole(req: any) {
        return this.dataservice.getHttpData('/role', req);
    }
    saveRole(req: any) {
        return this.dataservice.postHttpData('/role', req);
    }

  



}
