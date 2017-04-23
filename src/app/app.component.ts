import { Component, OnInit } from '@angular/core';
import { PushNotificationService } from './services/push-notification.service'
import { Router } from '@angular/router';

import {GlobalConfig} from './services/globalConfig.service';

@Component({
  selector: 'sb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [PushNotificationService]
})
export class AppComponent implements OnInit {

  showHeader: boolean = true;

  constructor(
    private PushNotificationService: PushNotificationService,
    private router:Router,
    private globalConfig:GlobalConfig
  ) {
  }

  ngOnInit() {
    this.PushNotificationService;

    //detect route change to emit event to control header visibility
    this.router.events
      .subscribe((event) => {
        // example: NavigationStart, RoutesRecognized, NavigationEnd
        console.log(event);
        const showHeader = !(this.router.url.includes('/camera') || this.router.url.includes('/landing'));
        this.globalConfig.emitDisplayHeaderEvent(showHeader);
    });

    this.subscibeToHeaderEvents();

  }
  subscibeToHeaderEvents(){
    this.globalConfig.getDisplayHeaderEmitter().subscribe(flag => {
      this.showHeader = flag;
    });
  }


}
