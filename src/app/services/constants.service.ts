/**
 * @ngdocs
 * @name service : ConstantService
 * @description Constants provider
 */

import { Injectable, Inject } from '@angular/core';

@Injectable()
export class Constants {
	cards:string = "cards";
	cssfilters: string[] = [
	  "original",
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
}

