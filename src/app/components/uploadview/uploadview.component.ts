import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PassUploadedDataService } from '../../services/pass-uploaded-data.service';

@Component({
  selector: 'sb-uploadview',
  templateUrl: './uploadview.component.html',
  styleUrls: ['./uploadview.component.scss']
})
export class UploadviewComponent implements OnInit {

  previewImage: any;
  selectedFilter: string = "none";
  cssfilters: string[] = [
    "_1977",
    "aden",
    "brannan",
    "brooklyn",
    "clarendon",
    "earlybird",
    "gingham",
    "hudson",
    "inkwell",
    "kelvin",
    "lark",
    "lofi",
    "maven",
    "mayfair",
    "moon",
    "nashville",
    "perpetua",
    "reyes",
    "rise",
    "slumber",
    "stinson",
    "toaster",
    "valencia",
    "walden",
    "willow",
    "xpro2"];

  constructor(router: Router, private pp: PassUploadedDataService) {

  }

  ngOnInit() {
    console.log(this.pp.getData());
  }

}
