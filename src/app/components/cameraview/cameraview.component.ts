import {Directive, Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';
import {StorageService} from "./../../services/storage.service";
import {GlobalConfig} from './../../services/globalConfig.service';
import {PassUploadedDataService} from '../../services/pass-uploaded-data.service';


@Component({
  selector: 'sb-cameraview',
  templateUrl: './cameraview.component.html',
  styleUrls: ['./cameraview.component.scss'],
  providers: [StorageService]
})
export class CameraviewComponent implements OnInit {

  @ViewChild('cameraSkinStage') cameraSkinStage: ElementRef;
  @ViewChild('cameraSkinSnapshot') cameraSkinSnapshot: ElementRef;
  @ViewChild('fallBackImg') fallbackImage: ElementRef;
  @ViewChild('capturedImageHolder') capturedImageHolder: ElementRef;
  @ViewChild('commentText') commentText: ElementRef;

  selectedFilter: string = "none";
  isPhotoTaken: boolean = false;
  permissionDeniedError: boolean = false;
  capturedImage: string;
  showTextArea: boolean = false;
  photoComments: string;
  videoTracks: any;
  activeViewContainer: String = "cameraStage";

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

  constructor(private StorageService: StorageService,
              private router: Router,
              private globalConfig: GlobalConfig,
              private pp: PassUploadedDataService,) {
    router.events.subscribe((val) => {
      console.log(val);
      this.stopCapture();
    });
  }

  ngOnInit() {
    this.globalConfig.emitDisplayHeaderEvent(false);
  }

  changeFilter(filter) {
    this.selectedFilter = filter;
  }

  convertCanvasToImage(canvas) {
    return canvas.toDataURL("image/png");
  }

  handleSuccess(stream) {
    this.cameraSkinStage.nativeElement.srcObject = stream;
    this.videoTracks = stream.getVideoTracks();
    console.log("VideoTracks", this.videoTracks);
  }

  handleError(err) {

    console.log("Error while starting Video Camera!!", err);
    this.activeViewContainer = "cameraError";

    switch (err.name) {
      case "PermissionDeniedError":
        this.permissionDeniedError = true;
        break;

      default:
        break;
    }
  }

  handleCapture(event) {
    this.activeViewContainer = "photoTaken";

    let snapshotCanvas = document.createElement("canvas");
    let context = snapshotCanvas.getContext('2d');
    let stage = this.cameraSkinStage.nativeElement;

    snapshotCanvas.width = stage.videoWidth;
    snapshotCanvas.height = stage.videoHeight;

    context.drawImage(stage, 0, 0, stage.videoWidth, stage.videoHeight);

    this.capturedImage = this.convertCanvasToImage(snapshotCanvas);
    this.stopCapture();
    this.pp.setData(this.capturedImage);
    this.router.navigate(['/upload']);
    // this.globalConfig.emitDisplayHeaderEvent(true);
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
   * Stores data to localforage
   * TODO:Validation on textarea
   *
   */
  storeData() {

    let dataURL = this.capturedImage;
    let commentText = this.commentText.nativeElement.value;

    /*Creating local storage snippet*/
    let data = {
      'title': Date.now(),
      'description': commentText,
      'src': dataURL,
      'selectedFilter': this.selectedFilter
    };

    /*TODO:Create unique user id based on login*/
    this.StorageService.getData('cards').then((val: any) => {
      if (!val) {
        val = []
      }
      ;
      console.log("Data retrieved successsfulyy!", val);
      this.StorageService.setData('cards', val.concat(data)).then((resp) => {
        console.log("Data added successfully!!");
        this.router.navigate(['/gallery']);
      });
    });

  }


  /**
   * Shows back the camera icon if photo is not ok
   * @param event
   */
  rejectCapture(event) {
    console.log("**RETAKE***");

    this.activeViewContainer = "cameraStage";
    // this.isPhotoTaken = false;
    // this.showTextArea = false;
    this.startCamera();
  }

  stopCapture() {
    // Stop all video streams.
    if (this.videoTracks) {
      this.videoTracks.forEach((track) => {
        track.stop()
      });
    }
  }

  ngAfterViewInit() {
    console.log("Child Views initiated!!!");
    this.startCamera();
  }

  startCamera() {
    navigator
      .mediaDevices
      .getUserMedia({video: true})
      .then(this.handleSuccess.bind(this), this.handleError.bind(this));
  }

}
