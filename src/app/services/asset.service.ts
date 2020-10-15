import { Injectable } from '@angular/core';
import { DataService } from './dataservice-service'

@Injectable()
export class AssetService {

    constructor(private dataservice: DataService) { }

    getAsset(req: any): any {
        return this.dataservice.getHttpData('/asset', req);
    }
    postAsset(req: any): any {
        return this.dataservice.postFileData('/asset', req);
    }
}
