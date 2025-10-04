import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
// Assuming you have AngularFire installed and configured
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthguardGuard implements CanActivate {
  constructor(
    private afAuth: AngularFireAuth, // Inject AngularFireAuth
    private router: Router // Inject the Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    // 1. Listen to the authState observable
    return this.afAuth.authState.pipe(
      // 2. Wait for the first emission and then complete
      take(1),
      // 3. Map the user object (firebase.User or null) to a boolean or UrlTree
      map((user) => {
        // Check if a user object exists (i.e., the user is logged in)
        const isAuthenticated = !!user;

        if (isAuthenticated) {
          // If true, allow navigation to the requested route
          return true;
        } else {
          // If false, redirect the user to the login page (or any public page)
          console.log('Access denied. Redirecting to login.');

          // Return a UrlTree to tell the router where to go instead
          return this.router.createUrlTree(['/login']);
        }
      })
    );
  }
}
