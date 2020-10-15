import { Injectable } from '@angular/core';
import { DataService } from '../../services/dataservice-service';
@Injectable({
  providedIn: 'root'
})
export class MasterserviceService {

  constructor(private dataservice: DataService) { }

  saveFyMaster(req:any){
    return this.dataservice.postHttpData('/upsertFy', req);
}
getFiyMaster(req:any)
    {
        return this.dataservice.getHttpData('/getFymaster', req);
    }
    saveTaxMaster(req:any){
        return this.dataservice.postHttpData('/upsertTaxmaster', req);
    }
    getTaxMaster(req:any)
    {
        return this.dataservice.getHttpData('/getTaxmaster', req);
    }
    saveChainacc(req:any)
    {
        return this.dataservice.postHttpData('/upsertChainaccount', req);
    }
    getChainacc(req:any)
    {
        return this.dataservice.getHttpData('/getChainaccount', req);
    }
}
