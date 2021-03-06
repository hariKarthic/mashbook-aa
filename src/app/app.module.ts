import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { MdToolbarModule } from '@angular/material';
import { MdIconModule } from '@angular/material';
import { MdButtonModule } from '@angular/material';
import {MdSidenavModule} from '@angular/material';

import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { HeaderComponent } from './components/header/header.component';
import { CameraviewComponent } from './components/cameraview/cameraview.component';
import { GalleryviewComponent } from './components/galleryview/galleryview.component';
import { PhotoviewComponent } from './components/photoview/photoview.component';

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { PhotoitemComponent } from './components/photoitem/photoitem.component';
import { UploadviewComponent } from './components/uploadview/uploadview.component';
import { PassUploadedDataService } from './services/pass-uploaded-data.service';

import { GlobalConfig } from './services/globalConfig.service';
import { FooterComponent } from './components/footer/footer.component';
import { IsMobileService } from "./services/ismobile.service";
import { Page404Component } from './components/page404/page404.component';
import { PageLoaderComponent } from './components/page-loader/page-loader.component';
import { ToasterComponent } from './components/toaster/toaster.component';
import { UploadErrorComponent } from './components/upload-error/upload-error.component';


// Initialize Firebase
let myFirebaseConfig = {
  apiKey: "AIzaSyBJ7cMU9QFd53uzhv3xBmaXXFw7wT4PB24",
  authDomain: "scrapbook-29ef5.firebaseapp.com",
  databaseURL: "https://scrapbook-29ef5.firebaseio.com",
  projectId: "scrapbook-29ef5",
  storageBucket: "scrapbook-29ef5.appspot.com",
  messagingSenderId: "787607072629"
};
// firebase.initializeApp(config);

const myFirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect
};

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HeaderComponent,
    CameraviewComponent,
    GalleryviewComponent,
    PhotoviewComponent,
    PhotoitemComponent,
    UploadviewComponent,
    FooterComponent,
    PageLoaderComponent,
    Page404Component,
    ToasterComponent,
    UploadErrorComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(myFirebaseConfig, myFirebaseAuthConfig),
    MdToolbarModule,
    MdIconModule,
    MdButtonModule,
    MdSidenavModule
  ],
  providers: [PassUploadedDataService, GlobalConfig, IsMobileService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
