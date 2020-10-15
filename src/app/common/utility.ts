import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
// import * as sampleData from 'assets/appconfig.json'

@Injectable({
    providedIn: 'root'
  })
export class Utility {

    config: any
    env: object
    httpOptions: object

    constructor(private http: HttpClient) {
        this.config = environment;
        this.env = environment;

        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa('user-name:password'),
                '_accid': '5b275a37f34c45c00a5de88b'
            })
        };
    }

    public getHttpData(reqURL: string) {
        return this.http.get(this.config["api_root"] + reqURL, this.httpOptions)
    }

    public postHttpData(reqURL: string, objData: any){
        return this.http.post(this.config["api_root"] + reqURL, objData, this.httpOptions);
    }
}
