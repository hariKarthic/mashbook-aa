import { Component, OnInit } from '@angular/core';
import { PushNotificationService } from './services/push-notification.service'
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError} from '@angular/router';
import {NgZone, Renderer2} from '@angular/core';


import {GlobalConfig} from './services/globalConfig.service';

@Component({
  selector: 'sb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [PushNotificationService]
})


export class AppComponent implements OnInit {

  showHeader: boolean = true;
  showLoader:boolean = true;

  constructor(
    private PushNotificationService: PushNotificationService,
    private router:Router,
    private globalConfig:GlobalConfig,
    private ngZone: NgZone
  ) {
  }

  ngOnInit() {
    // this.PushNotificationService;

    this.subscibeToHeaderEvents();//detect route change to emit event to control header visibility

    this.router.events
      .subscribe((event) => {

        const showHeader = !(this.router.url.includes('/camera') || this.router.url.includes('/landing'));
        this.globalConfig.emitDisplayHeaderEvent(showHeader);
        //
        this.navigationInterceptor(event);
      });

  }

  subscibeToHeaderEvents(){
    this.globalConfig.getDisplayHeaderEmitter().subscribe(flag => {
      this.showHeader = flag;
    });
  }

  navigationInterceptor(event: RouterEvent): void {

    if (event instanceof NavigationStart) {

      // run this function outside of Angular's zone to
      // bypass change detection
      this.ngZone.runOutsideAngular(() => {
        this.showLoader = true;
      });
    }
    if (event instanceof NavigationEnd) {
      this.hideSpinner();
    }

    // Set loading state to false in both of the below events to
    // hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.hideSpinner();
    }
    if (event instanceof NavigationError) {
      this.hideSpinner();
    }
  }

  hideSpinner(): void {

    // run this function outside of Angular's zone to
    // bypass change detection,
    this.ngZone.runOutsideAngular(() => {
      this.showLoader = false;
    });
  }


}
