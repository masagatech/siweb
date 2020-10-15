
import {throwError as observableThrowError,  Observable } from 'rxjs';

import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse  } from '@angular/common/http';



@Injectable()
export class Device_detetctorService {

  constructor(private http: HttpClient) { }

 //Get IP Adress using http://freegeoip.net/json/?callback
  getIpAddress() {
      return this.http
            .get('http://ipv4.myexternalip.com/json').pipe(
            map(response => response || {}))
            ;
  }

  private handleError(error: HttpErrorResponse):
      Observable<any> {
        //Log error in the browser console
        console.error('observable error: ', error);

        return observableThrowError(error);
    }
}
