import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class Base2blobService {

  constructor(private sanitizer: DomSanitizer) { }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  canvasToUrl(cnvs, mime = 'image/jpeg') {
    return new Promise((res, rej) => {
      cnvs.toBlob((blob) => {
        let url: String = URL.createObjectURL(blob);
        res(url)
      }, mime);
    });
  }

  createCanvasFromImg(img) {
    let cnvs = document.createElement('canvas');
    cnvs.width = img.naturalWidth || img.width || 460;
    cnvs.height = img.naturalHeight || img.height || 460;

    let ctx = cnvs.getContext("2d").drawImage(img, 0, 0);
    return cnvs;
  }

  async createBlobUrl(dataUrl) {

    let img = await this.createImgFromData(dataUrl);
    let cnvs = this.createCanvasFromImg(img);
    return this.canvasToUrl(cnvs)
  }

  async createImgFromData(uri) {
    let img = new Image();
    img.src = uri;
    return new Promise((res, rej) => {
      img.onload = function () {
        res(this)
      }
    });
  }

  async returnSrc(base64URL) {
    let blobUrl:any = await this.createBlobUrl(base64URL);
    return this.sanitize(blobUrl);
  }

}
