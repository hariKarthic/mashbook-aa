import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { CameraviewComponent } from './components/cameraview/cameraview.component';
import { GalleryviewComponent } from './components/galleryview/galleryview.component';
import { PhotoviewComponent } from './components/photoview/photoview.component';
import { UploadviewComponent } from './components/uploadview/uploadview.component';
import { Page404Component } from './components/page404/page404.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: "full",
    redirectTo: "/landing"
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
  }, 
  {
    path: '**', component: Page404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
