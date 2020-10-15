import { Injectable } from '@angular/core';
import { DataService } from '../services/dataservice-service';

@Injectable({
  providedIn: 'root'
})
export class AdvancesearchService {

  constructor(private dataservice: DataService) { }
  getDatasource(req: any) {
    return this.dataservice.getHttpData('/getDatasource', req);
  }
  create(req: any) {
    return this.dataservice.postHttpData('/create', req);
  }
  getSavedSearch(req: any) {
    return this.dataservice.getHttpData('/getSavedSearch', req);
  }
  show(req: any) {
    return this.dataservice.getHttpData('/show', req);
  }

  addAdvanceSearchData(req: any) {
    return this.dataservice.postHttpData('/add', req);
  }

  removeSavedSearch(req: any) {
    return this.dataservice.postHttpData('/remove', req);
  }
}
