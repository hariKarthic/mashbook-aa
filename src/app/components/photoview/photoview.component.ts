import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'sb-photoview',
  templateUrl: './photoview.component.html',
  styleUrls: ['./photoview.component.scss']
})
export class PhotoviewComponent implements OnInit {

  @Input() card: string;

  constructor() {
  }

  ngOnInit() {
    console.log("waererte", this.card);
  }

}
