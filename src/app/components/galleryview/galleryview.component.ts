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
      if(resp && resp.length>0){
        this.cards = this.groupPicturesByMonth(resp.reverse());
        this.loadMasonry();
        }
        this.isLoading = false;
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
   this.getCards();
  }

  groupPicturesByMonth(items){
    const  monthLabels = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let unordered = [];
    const itemsGroupedByMonth = (items)=>{
      let groups = [[], [], [], [], [], [], [], [], [], [], [], [],];

      for (let i = 0; i < items.length; i++) {
        const date = new Date(items[i].createdAt);
        groups[date.getMonth()].push(items[i]);
      }
      for (let j = 0; j < groups.length; j++) {
        if (groups[j].length) {

          unordered = unordered.concat({type:"caption", caption:monthLabels[j]+" "+new Date(groups[j][0]["createdAt"]).getFullYear()});
          unordered = unordered.concat(groups[j]);
        }
      }
      return unordered;
    };

    return itemsGroupedByMonth(items);
  }



}
