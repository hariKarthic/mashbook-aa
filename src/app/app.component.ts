import { Component, OnInit } from '@angular/core';
import { PushNotificationService } from './services/push-notification.service'

@Component({
  selector: 'sb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [PushNotificationService]
})
export class AppComponent implements OnInit {

  title = 'sb works!';
  public isLanding:boolean = false;

  constructor(private PushNotificationService: PushNotificationService) {
  }

  ngOnInit() {
    this.PushNotificationService;
  }

}
