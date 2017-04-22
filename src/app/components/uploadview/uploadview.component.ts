import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { PassUploadedDataService } from '../../services/pass-uploaded-data.service';
import { UtilsService } from '../../services/utils.service';
import { StorageService } from '../../services/storage.service';

import { Card } from '../../models/card.model';

@Component({
	selector: 'sb-uploadview',
	templateUrl: './uploadview.component.html',
	styleUrls: ['./uploadview.component.scss'],
	providers: [StorageService, UtilsService]
})
export class UploadviewComponent implements OnInit {

	previewImage: any = null;
	caption: string = null;
	selectedFilter: string = null;
	activeViewContainer: String = "photoTaken";
	// Filters
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

	constructor(private router: Router,
		private pp: PassUploadedDataService,
		private sanitizer: DomSanitizer,
		private Utils: UtilsService,
		private Storage: StorageService) {

	}

	ngOnInit() {
		this.previewImage = this.pp.getData()//this.sanitize(this.pp.getData());

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
		// this.showTextArea = true;
		// this.storeData();
	}

	/**
     * Shows back the camera icon if photo is not ok
     * @param event
     */
	rejectCapture(event) {
		console.log("**RETAKE***");

		// this.activeViewContainer = "cameraStage";
		// this.isPhotoTaken = false;
		// this.showTextArea = false;
		// this.startCamera();
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
		let data = new Card(this.Utils.getRandomID(), Date.now(), this.caption, this.previewImage, this.selectedFilter);
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
