import { Injectable } from '@angular/core';
import * as uuid from 'uuid';

@Injectable()
export class UtilsService {

  constructor() { }

	/**
	 * @name getRandomID
	 * @description Gets a random id
	 * @return ID
	 */
	getRandomID() {
		return uuid.v4();
	}

}
