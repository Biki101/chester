import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'; // This is the key import!
import { Router } from '@angular/router';
import firebase from 'firebase/app'; // For type definitions if needed, or error handling
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root',
})
export class AuthserviceService {
  email = '';
  password = '';
  error: string | null = null;
  user: firebase.User | null; // Observable<firebase.User | null>

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService
  ) {}

  async loginAnonymously() {
    this.error = null;
    try {
      const result = await this.auth.signInAnonymously();
      console.log('Anonymous User UID:', result.user?.uid);
      this.toastr.success('Logged In Sucessfully!', 'Success', {
        closeButton: true,
      });
    } catch (err: any) {
      throw err;
    }
  }

  async signUp(email: any, password: any) {
    this.error = null;
    try {
      const result = await this.auth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log('Signed Up User UID:', result.user?.uid);
      this.router.navigate(['welcome-page']);
      this.toastr.success('Signed Up Sucessfully!', 'Success', {
        closeButton: true,
      });
    } catch (err: any) {
      throw err;
    }
  }

  async signIn(email: any, password: any) {
    this.error = null;
    try {
      const result = await this.auth.signInWithEmailAndPassword(
        email,
        password
      );
      this.toastr.success('Signed In Sucessfully!', 'Success', {
        closeButton: true,
      });
      console.log('Signed In User UID:', result.user?.uid);
    } catch (err: any) {
      throw err;
    }
  }

  async signOut() {
    this.error = null;
    try {
      await this.auth.signOut();
      console.log('User signed out.');
      this.router.navigate(['']);
    } catch (err: any) {
      throw err;
    }
  }

  async signInWithGoogle() {
    this.error = null;
    try {
      // 1. Create a new Google Auth Provider instance
      const provider = new firebase.auth.GoogleAuthProvider();

      // 2. Use signInWithPopup for the OAuth flow
      const result = await this.auth.signInWithPopup(provider);

      // Handle success
      this.toastr.success('Signed In with Google Successfully!', 'Success', {
        closeButton: true,
      });
      console.log('Google Signed In User UID:', result.user?.uid);
      this.router.navigate(['/welcome-page']);
      return result;
    } catch (err: any) {
      // Handle errors (e.g., user closes the popup or invalid configuration)
      const errorMessage =
        err.message || 'An unknown error occurred during Google sign-in.';

      this.error = errorMessage;
      console.error('Google Sign In error:', err);

      this.toastr.error(errorMessage, 'Google Sign In Failed', {
        closeButton: true,
      });

      throw err;
    }
  }
}
