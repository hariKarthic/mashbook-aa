declare let require:any;
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { Constants } from '../../services/constants.service';

@Component({
  selector: 'sb-photoview',
  templateUrl: './photoview.component.html',
  styleUrls: ['./photoview.component.scss'],
  providers: [StorageService, Constants]
})
export class PhotoviewComponent implements OnInit {
	id:string;
	private sub: any;
	cardDetail:any = {};
	loading:boolean = true;

  	constructor(private Storage: StorageService, private Constants: Constants, private route: ActivatedRoute) {
  	}

  	ngOnInit() {
  		this.sub = this.route.params.subscribe(params => {
  			this.id = params['id'];
  			this.getCardDetail(this.id);
  		})
  	}

  	/**
  	 * Gets the card detail from indexed DB
  	 * returns card object
  	 * params: cardID
  	 */
  	getCardDetail(id:string) {
  		this.Storage.getData(this.Constants.cards)
  		.then((resp:any) => {
  			if(resp && resp.length > 0){
  				this.cardDetail = resp.filter((cardObj) => {
	  				if(cardObj.id === id) {
	  					return cardObj;
	  				}
	  			})[0];
	  			this.loading = false;
  			}else{
          this.loading = false;
        }

  		})
  	}

  	ngOnDestroy() {
  		this.sub.unsubscribe();
  	}

}
