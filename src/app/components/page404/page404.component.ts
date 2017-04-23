import { Component, OnInit } from '@angular/core';
import { IsMobileService } from "../../services/ismobile.service";

@Component({
  selector: 'sb-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.scss']
})
export class Page404Component implements OnInit {

  isMobile: boolean = false;
  constructor(private ismobileService: IsMobileService) { }

  ngOnInit() {
    this.isMobile = this.ismobileService.mobile();
  }

}
