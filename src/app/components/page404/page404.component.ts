import { Component, OnInit } from '@angular/core';
import { IsMobileService } from "../../services/ismobile.service";
// import { FileReaderService } from '../../services/file-reader.service';

@Component({
  selector: 'sb-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.scss']
})
export class Page404Component implements OnInit {

  isMobile: boolean = false;
  constructor(private ismobileService: IsMobileService,
  // private fileReader: FileReaderService
  ) { }

  ngOnInit() {
    this.isMobile = this.ismobileService.mobile();
  }

  // onFileUpload(event) {
  //   // this.fileReader.onFileUpload(event);
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
