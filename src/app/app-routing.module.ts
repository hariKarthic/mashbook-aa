import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LandingComponent} from './components/landing/landing.component';
import {CameraviewComponent} from './components/cameraview/cameraview.component';
import {GalleryviewComponent} from './components/galleryview/galleryview.component';
import {PhotoviewComponent} from './components/photoview/photoview.component';
import {UploadviewComponent} from './components/uploadview/uploadview.component';


const routes: Routes = [
  {
    path: '',
    children: []
  },
  {
    path: 'landing', component: LandingComponent
  },
  {
    path: 'camera', component: CameraviewComponent
  },
  {
    path: 'gallery', component: GalleryviewComponent
  },
  {
    path: 'gallery/scrap/:id', component: PhotoviewComponent
  },
  {
    path: 'upload', component: UploadviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
