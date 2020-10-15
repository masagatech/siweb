import { Injectable } from '@angular/core';
import{DataService} from '../../services/dataservice-service';
import { from } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class Favoriteservice {
    private show: boolean = false;

    constructor(private dataservice: DataService) { }


    saveFavmenu(req: any) {
        
        return this.dataservice.postHttpData('/upsertFavorite', req);
    }
    
    getFavmenu(req: any) {
        return this.dataservice.getHttpData('/getFavorite', req);
    }
  
    

    }