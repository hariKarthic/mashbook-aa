declare let require: any;
import { Injectable } from '@angular/core';
let  MobileDetect = require('mobile-detect');

@Injectable()
export class IsMobileService {

  instance: any;
  constructor() {
    this.instance = new MobileDetect(window.navigator.userAgent);
  }

  mobile() {
    return this.instance.mobile();
  }

}
