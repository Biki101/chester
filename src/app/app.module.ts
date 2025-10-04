import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
// Import specific service modules you need
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
// (If you were using Analytics, you'd also import AngularFireAnalyticsModule here)

import { firebaseConfig } from 'src/environments/environment';
import { LoginComponent } from './pages/login/login.component';
import { PassNPlayComponent } from './pages/pass-n-play/pass-n-play.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, PassNPlayComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // Initialize Firebase app with your config
    AngularFireModule.initializeApp(firebaseConfig),
    // Then import the specific service modules
    AngularFireAuthModule,
    AngularFirestoreModule,
    // AngularFireAnalyticsModule, // Uncomment if you are using Analytics
    // ... other Angular modules
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
