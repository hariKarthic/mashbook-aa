import { Injectable, Inject } from '@angular/core';
import { FirebaseApp, AngularFire } from "angularfire2";
import * as firebase from 'firebase';
import axios from 'axios';

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
        const params = {
          "registration_token": token,
          "notification_topic": "my_journal"
        };

        axios({
          url: "https://scrapbook-mash.herokuapp.com/notification/subscribe",
          method: "post",
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            "registration_token": token,
            "notification_topic": "my_journal"
          }
        }).then(function (response) {


          console.log("[RESPONSE]: ", response);

        })
          .catch(function (error) {
            console.log("[ERROR]: ", error);

          });
        // alert(token);
      }).catch(err => { console.log(err) });
  }

}
