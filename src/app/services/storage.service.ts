/**
 * @ngdocs
 * @name service : StorageService
 * @description Handles all the CRUD operations to be done for offline storage
 */

import * as localforage from 'localforage';
import { Injectable, Inject } from '@angular/core';

@Injectable()
export class StorageService {

	constructor() {
		localforage.config({
			name: "scrapbookdb",
			storeName: "sbdb"
		})
	}


	getData(key:string) {
		return localforage.getItem(key);
	}

	setData(key:string, value:any) {
		return localforage.setItem(key, value);
	}

	deleteData(key:string) {
		return localforage.removeItem(key);
	}
}