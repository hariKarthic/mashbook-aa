
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { PassUploadedDataService } from '../../services/pass-uploaded-data.service';
import { UtilsService } from '../../services/utils.service';
import { StorageService } from '../../services/storage.service';
import { Constants } from '../../services/constants.service';

import { Card } from '../../models/card.model';

@Component({
  selector: 'sb-uploadview',
  templateUrl: './uploadview.component.html',
  styleUrls: ['./uploadview.component.scss'],
  providers: [StorageService,
  UtilsService,
  Constants]
})
export class UploadviewComponent implements OnInit {

	imageInfo:any={};
	caption:string = null;
	selectedFilter:string = null;
	activeViewContainer: String = "photoTaken";
  cssFilters:string[] = [];
	// Filters

  	constructor(private router: Router, 
  		private pp: PassUploadedDataService, 
  		private sanitizer:DomSanitizer, 
  		private Utils: UtilsService, 
  		private Storage: StorageService,
      private Constants: Constants) {
      this.cssFilters = this.Constants.cssfilters;

  	}

  	ngOnInit() {
    	this.imageInfo = this.pp.getData()//this.sanitize(this.pp.getData());

  	}

  	sanitize(url: string) {
	    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
	}

	/**
     * Shows text area when captured photo is deemed ok
     * @param event
     */
	acceptCapture(event) {
	    console.log("Photo Accepted!!");
	    this.activeViewContainer = "showTextArea";
	}

	/**
     * Shows back the camera icon if photo is not ok
     * @param event
     */
	rejectCapture(event) {
      this.router.navigate(['/gallery']);
	}

	/**
	 * @desc changes the current filter
	 * @param selectedFilter
	 */

	changeFilter(selectedFilter) {
		this.selectedFilter = selectedFilter;
	}

  	/**
   	 *@desc Stored data in indexed db
     *@param event
     **/
  	storeData(event) {
  		let data = new Card(this.Utils.getRandomID(), Date.now(), this.caption, this.imageInfo.previewImage, this.selectedFilter);
  		this.Storage.getData('cards').then((val: any) => {
	      	if (!val) { val = [] };
	      	console.log("Data retrieved successsfulyy!", val);
	      	this.Storage.setData('cards', val.concat(data)).then((resp) => {
		        console.log("Data added suvvessfully!!");
		        this.router.navigate(['/gallery']);
	      	});
	    });
  	}

  	/**
     *@desc Rejects upload
   	 *@param event
   	 */
   	rejectUpload(event) {
   		console.log(event);
   	}
}
