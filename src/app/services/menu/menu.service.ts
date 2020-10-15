import { Injectable } from '@angular/core';
import { DataService } from '../dataservice-service'

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private dataservice: DataService) { }

  getMenu(req: any): any {
    return this.dataservice.getHttpData('/menu', req);
  }
  checkMenuAccess(req: any): any {
    return this.dataservice.getHttpData('/getMenuAccess', req);
  }
}
