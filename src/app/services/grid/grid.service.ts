import { Injectable } from '@angular/core';
import { DataService } from '../dataservice-service';

@Injectable()
export class GridService {
    constructor(private dataservice: DataService) {

    }

    getColumns(req: any) {
        return this.dataservice.getHttpData('/getColumns', req);
    }

    bindGrid(api: string, req: any) {
        return this.dataservice.getHttpData(api, req);
    }

    export(api: string, req: any) {
        return this.dataservice.getHttpData(api, req);
    }
}