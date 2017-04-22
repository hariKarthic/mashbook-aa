import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PassUploadedDataService } from '../../services/pass-uploaded-data.service';

@Component({
  selector: 'sb-uploadview',
  templateUrl: './uploadview.component.html',
  styleUrls: ['./uploadview.component.scss']
})
export class UploadviewComponent implements OnInit {

  constructor(router: Router, private pp: PassUploadedDataService) {

  }

  ngOnInit() {
    console.log(this.pp.getData());
  }

}
