import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LandingComponent} from './components/landing/landing.component';
import {CameraviewComponent} from './components/cameraview/cameraview.component';
import {GalleryviewComponent} from './components/galleryview/galleryview.component';


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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
