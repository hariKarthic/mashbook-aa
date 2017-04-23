import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { fadeOutRoute } from "../../app-transition";


@Component({
  selector: 'sb-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  animations: [fadeOutRoute]
})
export class LandingComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'inline-block';
  // @HostBinding('style.position') position = 'absolute';


  constructor(private router: Router) {
  }

  ngOnInit() {

    /*navigate to gallery after 2 secs...*/

    setTimeout(() => {

      this.router.navigate(["/gallery"]);

    }, 4000);

  }

}
