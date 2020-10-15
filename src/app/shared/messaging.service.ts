import { Injectable, NgZone, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { take } from 'rxjs/operators';
import { BehaviorSubject, Subscription } from 'rxjs'
import { ToastService } from '../services/other/toast-service';
import { DataService } from '../services/dataservice-service';
import { GlobalService } from '../services/global/global';
import { DashboardComponent } from '../modules/dashboard/index.comp';

@Injectable()
export class MessagingService {

  currentMessage = new BehaviorSubject(null);
  @ViewChild('dashboard') DashboardComponent;
  onmessageSubscription: Subscription;
  token: any;

  constructor(
    private angularFireDB: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth,
    private zone: NgZone,
    private messages: ToastService,
    private dataservice: DataService,
    public global: GlobalService,
    private angularFireMessaging: AngularFireMessaging) {
    this.angularFireMessaging.messaging.subscribe(
      (_messaging) => {
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);

        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      }
    )
  }

  /**
   * update token in firebase database
   * 
   * @param userId userId as a key 
   * @param token token as a value
   */
  updateToken(userId, token) {
    // we can change this function to request our backend service
    this.angularFireAuth.authState.pipe(take(1)).subscribe(
      () => {
        const data = {};
        data[userId] = token
        this.angularFireDB.object('fcmTokens/').update(data)
      })
  }

  /**
   * request permission for notification from firebase cloud messaging
   * 
   * @param userId userId
   */
  // requestPermission(userId) {

  //   if (this.token) {
  //     return;
  //   }
  //   return new Promise((resolve, reject) => {
  //     this.angularFireMessaging.requestToken.subscribe(
  //       (token) => {
  //         this.token = token;
  //         this.global.setFCMToken(this.token);
  //         this.updateToken(userId, token);
  //         resolve(token);
  //       },
  //       (err) => {
  //         reject(err)
  //         console.error('Unable to get permission to notify.', err);
  //       }
  //     );
  //   });
  // }

  /**
   * hook method when new notification received in foreground
   */
  // receiveMessage() {
  //   if (this.onmessageSubscription) {
  //     return;
  //   }
  //   let that = this;
  //   this.onmessageSubscription = this.angularFireMessaging.messages.subscribe(
  //     (payload) => {
  //       // console.log("new message received. ", payload);
  //       that.zone.run(() => {
  //         let type = payload['data'];
  //         type = type && type.type || 'info';
  //         let a = [];
  //         a = this.global.getNotification();
  //         a.push({ message: payload['notification'].body });
  //         this.global.setNotification(a);
  //         //this.dashboard.notificationList.push({ message: payload['notification'].body });
  //         that.messages.show(payload['notification'].title, payload['notification'].body, type, null);
  //       })

  //       this.currentMessage.next(payload);
  //     })

  //   this.angularFireMessaging.messages.pipe()
  // }

  storeTokenToDB(token = '') {
    let isregional = (this.global.getUser().isregional == null) ? 0 : 1;
    let req = { 'token': token, 'userid': this.global.getUser().id, 'useragent': navigator.appName, 'usertype': this.global.getUser().usertype, 'isregional': isregional };
    this.dataservice.postHttpData('/updatefcmtoken', req).subscribe((res) => {

    });
  }
}