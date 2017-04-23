import { Injectable } from '@angular/core';

@Injectable()
export class PassUploadedDataService {

  uri: any;

  getData() {
    return this.uri;
  }
  setData(data) {
    this.uri = data;
  }
}
