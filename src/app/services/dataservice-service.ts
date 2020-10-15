import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { ConfigModel } from './../intefaces/configModel';
import { Router } from '@angular/router';
import { GlobalService } from './global/global';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class DataService {
    config: ConfigModel;
    httpOptions: object;

    constructor(private http: HttpClient, private rounter: Router, private global: GlobalService) {
        this.config = global.getConfig();
    }

    public getHttpData(reqURL: string, objData: any) {
        this.global.loader = true;
        let token = '';
        if (localStorage.getItem('user') !== undefined && localStorage.getItem('user')!=null) {
            token = JSON.parse(localStorage.getItem('user'))['token'];
        }
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        if (objData === undefined) {
            objData = {};
        }
        //objData.t = (new Date().getTime());
        objData.userid = this.global.getUser().id;
        const params = $.param(objData);
        return this.http.get(this.config.api_root + reqURL + '?' + params, this.httpOptions)
            .pipe(map((x: any) => {
                if (x && x.errorCode && x.errorCode == 401) {
                    this.global.clearUser();
                    this.rounter.navigate(['/login']);
                    x.resultKey = 0
                    return x;
                }

                return x;

            }))
            .pipe(finalize(() => {
                // console.log('loaded');

                this.global.loader = false;
            }));
    }

    public postHttpData(reqURL: string, objData: any) {
        let t = (new Date().getTime());
        this.global.loader = true;
        let token = '';
        if (localStorage.getItem('user') !== undefined && localStorage.getItem('user') !== null) {
            token = JSON.parse(localStorage.getItem('user'))['token'];
        }
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        //return this.http.post(this.config.api_root + reqURL + '?t=' + t, objData, this.httpOptions).pipe(finalize(() => {
        objData.userid = this.global.getUser().id;
        return this.http.post(this.config.api_root + reqURL, objData, this.httpOptions)
            .pipe(map((x: any) => {
                if (x && x.errorCode && x.errorCode == 401) {
                    this.global.clearUser();
                    this.rounter.navigate(['/login']);
                    x.resultKey = 0
                    return x;
                }

                return x;

            }))
            .pipe(finalize(() => {
                // console.log('loaded');
                this.global.loader = false;

            }));
    }

    public postFileData(reqURL: string, objData: any) {
        let t = (new Date().getTime());
        this.global.loader = true;
        let token = '';
        if (localStorage.getItem('user') !== undefined && localStorage.getItem('user') !== null) {
            token = JSON.parse(localStorage.getItem('user'))['token'];
        }
        this.httpOptions = {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + token
            })
        };
        //return this.http.post(this.config.api_root + reqURL + '?t=' + t, objData, this.httpOptions).pipe(finalize(() => {
        objData.userid = this.global.getUser().id;
        return this.http.post(this.config.api_root + reqURL, objData, this.httpOptions)
            .pipe(map((x: any) => {
                if (x && x.errorCode && x.errorCode == 401) {
                    this.global.clearUser();
                    this.rounter.navigate(['/login']);
                    x.resultKey = 0
                    return x;
                }

                return x;

            }))
            .pipe(finalize(() => {
                // console.log('loaded');
                this.global.loader = false;

            }));
    }

}
