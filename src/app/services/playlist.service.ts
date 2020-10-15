import { Injectable } from '@angular/core';
import { DataService } from './dataservice-service';

@Injectable()
export class PlaylistService {

    constructor(private dataservice: DataService) { }

    getPlaylist(req: any): any {
        return this.dataservice.getHttpData('/playlist', req);
    }
    postPlaylist(req: any): any {
        return this.dataservice.postFileData('/playlist', req);
    }
}
