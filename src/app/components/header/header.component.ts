import {Component, OnInit, HostBinding} from '@angular/core';
import {Router} from '@angular/router';
import {PassUploadedDataService} from '../../services/pass-uploaded-data.service';
import {IsMobileService} from  "../../services/ismobile.service";


@Component({
  selector: 'sb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],

})
export class HeaderComponent implements OnInit {


  isMobile: boolean = false;

  constructor(private router: Router,
              private pp: PassUploadedDataService,
              private ismobileService: IsMobileService) {
  }

  ngOnInit() {

    this.isMobile = this.ismobileService.mobile();

  }

  onFileUpload(event) {
    let inputElem = event.currentTarget;
    if (inputElem.files && inputElem.files[0]) {

      let reader = new FileReader();
      reader.onload = (e) => {
        this.pp.setData({"previewImage":reader.result, "action": "upload"});
        inputElem.value = null;
        this.router.navigate(['/upload']);
      }
      reader.readAsDataURL(inputElem.files[0]);
    }
  }
}
