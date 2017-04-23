import { Injectable } from '@angular/core';

@Injectable()
export class FileReaderService {

  // onFileUpload(event) {
  //   let inputElem = event.currentTarget;
  //   if (inputElem.files && inputElem.files[0]) {

  //     let reader = new FileReader();
  //     reader.onload = (e) => {
  //       let mimeType = reader.result.split(",")[0].split(":")[1].split(";")[0];
  //       let isMimeAccepted = !!mimeType.match("image/*");
  //       if(isMimeAccepted){
  //         this.pp.setData({ "previewImage": reader.result, "action": "upload" });
  //         inputElem.value = null;
  //         this.router.navigate(['/upload']);
  //       }
  //       else{
  //         this.router.navigate(['/uploaderror']);
  //       }
  //     }
  //     reader.readAsDataURL(inputElem.files[0]);
  //   }
  // }

}
