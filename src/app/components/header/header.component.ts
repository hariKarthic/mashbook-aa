import {Component, OnInit, HostBinding} from '@angular/core';
import {Router} from '@angular/router';
import {PassUploadedDataService} from '../../services/pass-uploaded-data.service';
import {GlobalConfig} from "./../../services/globalConfig.service";
import {IsMobileService} from  "../../services/ismobile.service";


@Component({
  selector: 'sb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],

})
export class HeaderComponent implements OnInit {

  showHeader: boolean = true;
  isMobile: boolean = false;

  constructor(private router: Router,
              private pp: PassUploadedDataService,
              private globalConfig: GlobalConfig,
              private ismobileService: IsMobileService) {
  }

  ngOnInit() {
    console.log("Header component initialised!");
    this.globalConfig.getDisplayHeaderEmitter().subscribe(flag => {
      this.showHeader = flag;
    });

    this.isMobile = this.ismobileService.mobile();

  }

  onFileUpload(event) {
    let inputElem = event.currentTarget;
    if (inputElem.files && inputElem.files[0]) {

      let reader = new FileReader();
      reader.onload = (e) => {
        this.pp.setData({"url":reader.result, "action": "upload"});
        this.router.navigate(['/upload']);
      }
      reader.readAsDataURL(inputElem.files[0]);
    }
  }
}
