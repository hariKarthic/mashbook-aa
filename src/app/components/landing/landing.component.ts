import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'sb-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {


  constructor(private router: Router) {
  }

  ngOnInit() {

    /*navigate to gallery after 2 secs...*/

    setTimeout(() => {

      //this.router.navigate(["/gallery"]);

    }, 4000);

  }

}
