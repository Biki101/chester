import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { Subscription } from 'rxjs';
import firebase from 'firebase/app'; // For type definitions if needed, or error handling

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  user: firebase.User | null;
  private authSubscription: Subscription;
  constructor(
    private authService: AuthserviceService,
    private auth: AngularFireAuth,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.auth.authState.subscribe((user) => {
      this.user = user; // The 'user' here is the actual user object (or null)
      if (user) {
        console.log('User UID is:', user.uid);
        // You can perform synchronous actions here
        this.router.navigate(['welcome-page']);
      } else {
        console.log('User is logged out.');
      }
    });
  }

  onSignOut() {
    this.authService.signOut();
  }

  onPassAndPlayMode() {
    this.router.navigate(['pass-n-play']);
  }
}
