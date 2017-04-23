declare let require: any;
import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {Card} from '../../models/card.model';
import {StorageService} from "../../services/storage.service";
import {Constants} from "../../services/constants.service";
let Masonry = require('masonry-layout');
let imagesLoaded = require('imagesLoaded');


@Component({
  selector: 'sb-galleryview',
  templateUrl: './galleryview.component.html',
  styleUrls: ['./galleryview.component.scss'],
  providers: [StorageService,
  Constants]
})
export class GalleryviewComponent implements OnInit, AfterViewInit {


  @ViewChild('grid') grid;
  public mason: any;

  public cards: any;
  isLoading:boolean = true;

  constructor( private StorageService: StorageService,
    private Constants: Constants) {
  }

  ngOnInit() {
     this.getCards()
  }

  /**
   * @name getCards
   * @description Gets the card list from Indexed DB
   */

  getCards() {
    this.StorageService.getData(this.Constants.cards)
    .then((resp:any)=> {
      if(!resp){  
        this.cards = resp;
        this.loadMasonry();
        this.isLoading = false;
      }
    }, (err)=> {
      console.log(err)
    });
  }

  loadMasonry() {
     let photogrid = this.grid ? this.grid.nativeElement : "";
    /*Initialise Masonry*/
    if(photogrid === "") return;
    /*TODO:Do a null check on photogrid*/
    imagesLoaded(photogrid, function () {
      this.mason = new Masonry(photogrid, {
        itemSelector: ".sb-gallery_item",
        columnWidth: ".sb-gallery_sizer",
        percentPosition: true,
        gutter: 5
      })
    }.bind(this))
  }

  ngAfterViewInit() {
   this.getCards()


  }



}
