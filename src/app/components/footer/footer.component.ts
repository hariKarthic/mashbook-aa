import {Component, OnInit} from '@angular/core';
import {IsMobileService} from  "../../services/ismobile.service";


@Component({
  selector: 'sb-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public isMobile: boolean = false;

  constructor(private ismobileService: IsMobileService) {

  }

  ngOnInit() {

    this.isMobile = this.ismobileService.mobile();
    console.log("ISMobile Device", this.isMobile);
  }

}
