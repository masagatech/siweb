import { Injectable } from '@angular/core';
import { DataService } from '../services/dataservice-service';
@Injectable({
    providedIn: 'root'
})
export class Shortcutservice {
    private show: boolean = false;

    constructor(private dataservice: DataService) { }


    postFavmenu(req: any) {
        
        return this.dataservice.postHttpData('/upsertFavorite', req);
    }
    
    getFavmenu(req: any) {
        return this.dataservice.getHttpData('/getFavorite', req);
    }
  
    

    }