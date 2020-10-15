import { Injectable } from '@angular/core';
import { DataService } from '../dataservice-service'

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    constructor(private dataservice: DataService) { }

    getDashboard(req: any): any {
        return this.dataservice.getHttpData('/dashboard', req);
    }
    
    postDashboard(req:any):any{
        return this.dataservice.postHttpData('/dashboard',req);
    }
}