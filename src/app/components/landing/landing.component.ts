import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sb-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  isLanding: boolean = true;

  constructor() {
  }

  ngOnInit() {
  }

}
