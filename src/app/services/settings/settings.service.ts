import { Injectable } from '@angular/core';
import { DataService } from "../dataservice-service";

@Injectable()
export class SettingsService {

  constructor(private dataservice: DataService) { }

  create(req: any) {
    return this.dataservice.postHttpData('/upsertSettings', req);
  }
  clientConfiguration(req: any) {
    return this.dataservice.postHttpData('/upsertClientSettings', req);
  }

  show(req: any) {
    return this.dataservice.getHttpData('/showSetting', req);
  }
  saveEmail(req: any) {
    return this.dataservice.postHttpData('/upsertEmailsetting', req);
  }
  showEmailsetting(req: any) {
    return this.dataservice.getHttpData('/getEmailsetting', req);
  }
  saveLanguagesetting(req: any) {

    return this.dataservice.postHttpData('/upsertLanguagesetting', req);
  }

  getLanguagsetting(req: any) {
    return this.dataservice.getHttpData('/getLanguageseting', req);
  }
  saveAccountingdetails(req: any) {

    return this.dataservice.postHttpData('/upsertAccountingdetails', req);
  }
  getAccountingdetails(req: any) {
    return this.dataservice.getHttpData('/getAccountingdetails', req);
  }
  getAccountDate(req: any) {
    return this.dataservice.getHttpData('/getAccountingDate', req);
  }
  putAccountDate(req: any) {
    return this.dataservice.postHttpData('/putAccountDate', req);
  }

  getDeadlineDate(req: any) {
    return this.dataservice.getHttpData('/getDeadlineDate', req);
  }

  get(req:any){
    return this.dataservice.getHttpData('/settings', req);
  }

  post(req: any) {
    return this.dataservice.postHttpData('/settings', req);
  }
}

