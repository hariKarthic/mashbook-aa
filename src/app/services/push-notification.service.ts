import { Injectable, Inject } from '@angular/core';
import { FirebaseApp, AngularFire } from "angularfire2";
import * as firebase from 'firebase';
import axios from 'axios';

@Injectable()
export class PushNotificationService {

  private messaging: firebase.messaging.Messaging;

  constructor( @Inject(FirebaseApp) private _firebaseApp) {

    this.messaging = this._firebaseApp.messaging();
  }

  /**
   * @name requestNotificationService
   * @desc Requests access for notification access
   */

  requestNotificationService() {
    this.messaging
      .requestPermission()
      .then(() => {
        return this.messaging.getToken();
      }).then((token) => {
        console.log("has persmission: ", token);

        let generateTopicWithOffset = (offset) => {
          const prefix = (offset < 0) ? "__" : "_";
          const postfix = Math.abs(offset);
          return `scrap_book${prefix}${postfix}`;
        };

        let generateTopic = () => {
          const date = new Date();
          const offset = date.getTimezoneOffset();
          return generateTopicWithOffset(offset);
        };

        let params = {
          "registration_token": token,
          "notification_topic": generateTopic()
        };


        axios({
          url: "https://scrapbook-mash.herokuapp.com/notification/subscribe",
          method: "post",
          headers: {
            'Content-Type': 'application/json'
          },
          data: params
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
