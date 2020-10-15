import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http'
import { DataService } from '../services/dataservice-service';

// import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class LanguageserviceService {

  constructor(private http: HttpClient, private dataservice: DataService) {

  }
  save(req: any) {
    return this.dataservice.postHttpData('./assets/i18n/languageAPI.php', req);
  }

}
