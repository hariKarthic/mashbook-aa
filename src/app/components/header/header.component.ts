import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { PassUploadedDataService } from '../../services/pass-uploaded-data.service';

import GlobalConfig from "./../../services/globalConfig.service";
import { slideInDownAnimation } from "../../app-transition.module";

@Component({
  selector: 'sb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showHeader: boolean = true;
  @HostBinding('@routeAnimation') routeAnimation = true;

  constructor(
    private router: Router,
    private pp: PassUploadedDataService,
    private globalConfig: GlobalConfig
  ) { }

  ngOnInit() {
    console.log("Header component initialised!");
    this.globalConfig.getDisplayHeaderEmitter().subscribe(flag => {
      this.showHeader = flag;
    });
  }

  onFileUpload(event) {
    let inputElem = event.currentTarget;
    if (inputElem.files && inputElem.files[0]) {

      let reader = new FileReader();
      reader.onload = (e) => {
        this.router.navigate(['/upload']);
      }
      reader.readAsDataURL(inputElem.files[0]);
    }
  }
}
