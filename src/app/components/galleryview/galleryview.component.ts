declare let require: any;
import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {Card} from '../../models/card.model';
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

  public cards: Card[];

  constructor() {
    /*TODO:Replace with actual cards from indexed db*/
    this.cards = [
      new Card("1", 1492853041180, "Test 1", 'http://lorempixel.com/200/200/people', 'test1'),
      new Card("2", 1492853205009, "Test 2", 'http://lorempixel.com/200/250/animals/', 'test2'),
      new Card("3", 1492853227016, "Test 3", 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQNua9BAIpL7ryiLkbL1-UleMUqURv--Ikt7y6dwb8GgH2Rx7D0', 'test3')

    ];
    
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
