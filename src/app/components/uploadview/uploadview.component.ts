
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { PassUploadedDataService } from '../../services/pass-uploaded-data.service';
import { UtilsService } from '../../services/utils.service';
import { StorageService } from '../../services/storage.service';
import { Constants } from '../../services/constants.service';
import { Base2blobService } from '../../services/base2blob.service';

import { Card } from '../../models/card.model';



@Component({
	selector: 'sb-uploadview',
	templateUrl: './uploadview.component.html',
	styleUrls: ['./uploadview.component.scss'],
	providers: [StorageService,
		UtilsService,
		Constants,
		Base2blobService]
})
export class UploadviewComponent implements OnInit {

	imageInfo: any = {};
	caption: string = null;
	selectedFilter: string = null;
	activeViewContainer: String = "photoTaken";
	cssFilters: string[] = [];
	blobUrl: any = null;
	// Filters

	constructor(private router: Router,
		private pp: PassUploadedDataService,
		private sanitizer: DomSanitizer,
		private Utils: UtilsService,
		private Storage: StorageService,
		private Constants: Constants,
		private base2blobService: Base2blobService) {
		this.cssFilters = this.Constants.cssfilters;

	}

	ngOnInit() {
		this.imageInfo = this.pp.getData();
		this.updateSrc(this.imageInfo.previewImage)
	}

	ngDoCheck() {
	}

	async updateSrc(base64) {
		this.blobUrl = await this.base2blobService.returnSrc(this.imageInfo.previewImage);
	}

	sanitize(url: string) {
		return this.sanitizer.bypassSecurityTrustResourceUrl(url);
	}

	/**
     * Shows text area when captured photo is deemed ok
     * @param event
     */
	acceptCapture(event) {
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
	 * @desc Stored data in indexed db
	 * @param event
	 **/
	storeData(event) {
		let data = new Card("img", this.Utils.getRandomID(), Date.now(), this.caption, this.imageInfo.previewImage, this.selectedFilter);
		this.Storage.getData('cards').then((val: any) => {
			if (!val) { val = [] };
			this.Storage.setData('cards', val.concat(data)).then((resp) => {
				this.router.navigate(['/gallery']);
			});
		});
	}

	/**
	 * @desc Rejects upload
	 * @param event
	 */
	rejectUpload(event) {
		this.router.navigate(['/gallery']);
	}
}
