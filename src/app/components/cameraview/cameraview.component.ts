import { Directive, Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from "./../../services/storage.service";
import { GlobalConfig } from './../../services/globalConfig.service';
import { PassUploadedDataService } from '../../services/pass-uploaded-data.service';
// import { FileReaderService } from '../../services/file-reader.service';


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
  activeViewContainer: string;

  constructor(private StorageService: StorageService,
    private router: Router,
    // private fileReader: FileReaderService,
    private globalConfig: GlobalConfig,
    private pp: PassUploadedDataService) {
    router.events.subscribe((val) => {
      // console.log(val);
      this.stopCapture();
    });
  }

  ngOnInit() {

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
  }

  handleError(err) {
    this.activeViewContainer = "cameraError";

    switch (err.name) {
      case "PermissionDeniedError":
        this.permissionDeniedError = true;
        break;

      default:
        break;
    }

    this.globalConfig.emitDisplayHeaderEvent(true);
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
    this.pp.setData({ "previewImage": this.capturedImage, "action": "camera" });
    this.router.navigate(['/upload']);
    this.globalConfig.emitDisplayHeaderEvent(true);
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
    // console.log("Child Views initiated!!!");
    this.startCamera();
  }

  startCamera() {
    navigator
      .mediaDevices
      .getUserMedia({ video: true })
      .then(this.handleSuccess.bind(this), this.handleError.bind(this));

    this.activeViewContainer = "cameraStage";
  }

  onFileUpload(event) {
    // this.fileReader.onFileUpload(event);
    // let inputElem = event.currentTarget;
    // if (inputElem.files && inputElem.files[0]) {

    //   let reader = new FileReader();
    //   reader.onload = (e) => {
    //     let mimeType = reader.result.split(",")[0].split(":")[1].split(";")[0];
    //     let isMimeAccepted = !!mimeType.match("image/*");
    //     if(isMimeAccepted){
    //       this.pp.setData({ "previewImage": reader.result, "action": "upload" });
    //       inputElem.value = null;
    //       this.router.navigate(['/upload']);
    //     }
    //     else{
    //       this.router.navigate(['/uploaderror']);
    //     }
    //   }
    //   reader.readAsDataURL(inputElem.files[0]);
    // }
  }

}
