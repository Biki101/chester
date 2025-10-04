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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthserviceService } from './services/authservice.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PassNPlayComponent,
    WelcomePageComponent,
  ],
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
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      // positionClass: 'toast-bottom-right',
      // preventDuplicates: true,
    }),

    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
