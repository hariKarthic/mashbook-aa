import 'hammerjs';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppRoutingModule} from './app-routing.module';
import {MdToolbarModule} from '@angular/material';
import {MdIconModule} from '@angular/material';
import {MdButtonModule} from '@angular/material';


import {AppComponent} from './app.component';
import {LandingComponent} from './components/landing/landing.component';
import {HeaderComponent} from './components/header/header.component';
import { CameraviewComponent } from './components/cameraview/cameraview.component';
import { GalleryviewComponent } from './components/galleryview/galleryview.component';
import { PhotoviewComponent } from './components/photoview/photoview.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HeaderComponent,
    CameraviewComponent,
    GalleryviewComponent,
    PhotoviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MdToolbarModule,
    MdIconModule,
    MdButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
