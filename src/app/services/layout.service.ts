import { Injectable } from '@angular/core';
import { DataService } from './dataservice-service';

@Injectable()
export class LayoutService {

    constructor(private dataservice: DataService) { }

    getLayout(req: any): any {
        return this.dataservice.getHttpData('/layout', req);
    }
    postLayout(req: any): any {
        return this.dataservice.postFileData('/layout', req);
    }
}
