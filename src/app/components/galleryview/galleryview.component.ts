declare let require: any;
import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
let Masonry = require('masonry-layout');
let imagesLoaded = require('imagesLoaded');


@Component({
  selector: 'sb-galleryview',
  templateUrl: './galleryview.component.html',
  styleUrls: ['./galleryview.component.scss']
})
export class GalleryviewComponent implements OnInit, AfterViewInit {


  @ViewChild('grid') grid;
  public mason: any;

  public cards: Array<string>;

  constructor() {
    /*TODO:Replace with actual cards*/
    this.cards = ['http://lorempixel.com/200/200/people', 'http://lorempixel.com/200/400/people', 'http://lorempixel.com/200/250/animals/']
  }

  ngOnInit() {

  }

  ngAfterViewInit() {

    console.log(this.grid.nativeElement);
    let photogrid = this.grid.nativeElement;
    /*Initialise Masonry*/

    imagesLoaded(photogrid, function () {
      this.mason = new Masonry(photogrid, {
        itemSelector: ".sb-gallery_item",
        columnWidth: ".sb-gallery_sizer",
        percentPosition: true,
        gutter:10
      })
    }.bind(this))


  }

}
