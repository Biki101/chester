import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'; // This is the key import!
import firebase from 'firebase/app'; // For type definitions if needed, or error handling

@Injectable({
  providedIn: 'root',
})
export class AuthserviceService {
  email = '';
  password = '';
  error: string | null = null;
  user: firebase.User | null; // Observable<firebase.User | null>

  constructor(private auth: AngularFireAuth) {}

  async loginAnonymously() {
    this.error = null;
    try {
      const result = await this.auth.signInAnonymously();
      console.log('Anonymous User UID:', result.user?.uid);
    } catch (err: any) {
      this.error = err.message;
      console.error('Anonymous login error:', err);
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
    } catch (err: any) {
      this.error = err.message;
      console.error('Sign Up error:', err);
    }
  }

  async signIn(email: any, password: any) {
    this.error = null;
    try {
      const result = await this.auth.signInWithEmailAndPassword(
        email,
        password
      );
      console.log('Signed In User UID:', result.user?.uid);
    } catch (err: any) {
      this.error = err.message;
      console.error('Sign In error:', err);
    }
  }

  async signOut() {
    this.error = null;
    try {
      await this.auth.signOut();
      console.log('User signed out.');
    } catch (err: any) {
      this.error = err.message;
      console.error('Sign Out error:', err);
    }
  }
}
