import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from 'src/app/services/authservice.service';
import firebase from 'firebase/app'; // For type definitions if needed, or error handling
import { Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: firebase.User | null;
  private authSubscription: Subscription;
  constructor(
    private fb: FormBuilder,
    private authService: AuthserviceService,
    private auth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: [, Validators.required],
      password: [, Validators.required],
    });

    // checking if user exists
    this.user = authService.user;
  }

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

  ngOnDestroy() {
    // IMPORTANT: Always unsubscribe to prevent memory leaks
    this.authSubscription.unsubscribe();
  }

  onSignIn() {
    this.authService
      .signIn(this.loginForm.value.email, this.loginForm.value.password)
      .catch((error) => {
        this.toastr.error('Unable to Sign In!', 'Error');
      });
  }

  onSignUp() {
    this.authService
      .signUp(this.loginForm.value.email, this.loginForm.value.password)
      .catch((error) => {
        this.toastr.error('Unable to Register!', 'Error');
      });
  }

  onPlayAsGuest() {
    this.authService.loginAnonymously().catch((error) => {
      this.toastr.error('Unable to Play as Guest!', 'Error');
    });
  }

  onGoogleSignIn() {
    this.authService.signInWithGoogle().catch((error) => {
      this.toastr.error('Unable to Sign in with Google!', 'Error');
    });
  }
}
