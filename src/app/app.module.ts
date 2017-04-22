import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

// Initialize Firebase
var myFirebaseConfig = {
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
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(myFirebaseConfig, myFirebaseAuthConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
