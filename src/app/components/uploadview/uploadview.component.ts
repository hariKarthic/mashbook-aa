
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

	imageInfo: any = {};
	caption: string = null;
	selectedFilter: string = null;
	activeViewContainer: String = "photoTaken";
	cssFilters: string[] = [];
	// Filters

	constructor(private router: Router,
		private pp: PassUploadedDataService,
		private sanitizer: DomSanitizer,
		private Utils: UtilsService,
		private Storage: StorageService,
		private Constants: Constants) {
		this.cssFilters = this.Constants.cssfilters;

	}

	canvasToData(canvas) {
		return canvas.toDataURL("image/png");
	}

	canvasToUrl(cnvs, mime = 'image/jpeg') {
		return new Promise((res, rej) => {
			cnvs.toBlob((blob) => {
				let url: String = URL.createObjectURL(blob);
				res(url)
			}, mime);
		});
	}

	createCanvasFromImg(img) {
		let cnvs = document.createElement('canvas');
		cnvs.width = img.naturalWidth || img.width || 460;
		cnvs.height = img.naturalHeight || img.height || 460;
		let ctx = cnvs.getContext("2d").drawImage(img, 0, 0);
		return cnvs;
	}

	async createBlobUrl(dataUrl) {

		let img = await this.createImgFromData(dataUrl);
		let cnvs = this.createCanvasFromImg(img);
		return this.canvasToUrl(cnvs)
	}

	async createImgFromData(uri) {
		let img = new Image();
		img.src = uri;
		return new Promise((res, rej) => {
			img.onload = function () {
				res(this)
			}
		});
	}

	async updateSrc(base64URL) {

		let blobUrl:any = await this.createBlobUrl(base64URL);
		this.imageInfo.previewImage = this.sanitize(blobUrl);
	}

	ngOnInit() {
		this.imageInfo = this.pp.getData()//this.sanitize(this.pp.getData());
		this.updateSrc(this.imageInfo.previewImage);

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
		 *@desc Stored data in indexed db
	 *@param event
	 **/
	storeData(event) {
		let data = new Card(this.Utils.getRandomID(), Date.now(), this.caption, this.imageInfo.previewImage, this.selectedFilter);
		this.Storage.getData('cards').then((val: any) => {
			if (!val) { val = [] };
			this.Storage.setData('cards', val.concat(data)).then((resp) => {
				this.router.navigate(['/gallery']);
			});
		});
	}

	/**
	 *@desc Rejects upload
		 *@param event
		 */
	rejectUpload(event) {
		this.router.navigate(['/gallery']);
	}
}
