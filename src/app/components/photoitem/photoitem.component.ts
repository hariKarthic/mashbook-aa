import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from '../../models/card.model';


@Component({
  selector: 'sb-photoitem',
  templateUrl: './photoitem.component.html',
  styleUrls: ['./photoitem.component.scss']
})
export class PhotoitemComponent implements OnInit {
	@Input() card: Card;

  	constructor(private router: Router) { }

  	ngOnInit() {
  	}

  	/**
  	 * @desc Navigates to card detail
  	 * @param Card ID
  	 */
  	showDetail(id) {
  		this.router.navigate(['gallery/scrap', id]);
  	}

}
