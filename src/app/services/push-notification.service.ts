import { Injectable, Inject } from '@angular/core';
import { FirebaseApp, AngularFire } from "angularfire2";
import * as firebase from 'firebase';

@Injectable()
export class PushNotificationService {

  private messaging: firebase.messaging.Messaging;

  constructor( @Inject(FirebaseApp) private _firebaseApp) {

    this.messaging = this._firebaseApp.messaging();

    this.messaging
      .requestPermission()
      .then(() => {
        return this.messaging.getToken();
      }).then((token) => {
        console.log("has persmission: ", token);
        alert(token);
      }).catch(err => { alert(err) });
  }

}
