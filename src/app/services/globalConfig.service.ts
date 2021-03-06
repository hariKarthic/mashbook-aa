import { Injectable, EventEmitter } from '@angular/core';


@Injectable()
export class GlobalConfig{
  navchange: EventEmitter<number> = new EventEmitter();
  constructor() {

  }
  emitDisplayHeaderEvent(flag){
    this.navchange.emit(flag);
  }
  getDisplayHeaderEmitter(){
    return this.navchange;
  }

}

