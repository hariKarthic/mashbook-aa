import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LandingComponent} from './components/landing/landing.component';
import {CameraviewComponent} from './components/cameraview/cameraview.component';
import {GalleryviewComponent} from './components/galleryview/galleryview.component';
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
    path: 'upload', component: UploadviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
