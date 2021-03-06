import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AUTH_CONFIG } from './auth.config';
import * as auth0 from 'auth0-js';

// Avoid name not found warnings
declare var auth0: any;

@Injectable()
export class AuthService {
  // Create Auth0 web auth instance
  private _auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.CLIENT_ID,
    domain: AUTH_CONFIG.CLIENT_DOMAIN,
    responseType: 'token id_token',
    redirectUri: AUTH_CONFIG.REDIRECT,
    audience: AUTH_CONFIG.AUDIENCE,
    scope: AUTH_CONFIG.SCOPE
  });
  userProfile: any;
  // Create a stream of logged in status to communicate throughout app
  loggedIn: boolean;
  loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);

  constructor(private router: Router) {
    // If authenticated, set local profile property
    // and update login status subject.
    // If not authenticated but there are still items
    // in localStorage, log out.

    if (this.tokenValid) {
      this.userProfile = this._getProfile()
      this.setLoggedIn(true);
    } else if (!this.tokenValid) {
      this.logout();
    }
  }
  setLoggedIn(value: boolean) {
    // Update login status subject
    this.loggedIn$.next(value);
    this.loggedIn = value;
  }

  login(redirect?: string) {
    // Auth0 authorize request
    const _redirect = redirect ? redirect : this.router.url;
    localStorage.setItem('authRedirect', _redirect);
    this._auth0.authorize();
  }

  handleAuth() {
    // When Auth0 hash parsed, get profile
    this._auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        // this._getProfile(authResult);
        this._setSession(authResult)
        this._getProfile(authResult);
        this.router.navigate([localStorage.getItem('authRedirect') || '/']);
        this._clearRedirect();
      } else if (err) {
        this._clearRedirect();
        this.router.navigate(['/']);
        console.error(`Error authenticating: ${err.error}`);
      }
      this.router.navigate(['/']);
    });
  }

  private _getProfile(authResult?) {
    if (this.userProfile) {
      return this.userProfile
    }
    if (authResult) {
      this.retrieveProfileFromAuth0(authResult.accessToken);
    } else {
      this.retrieveProfileFromAuth0(localStorage.getItem('access_token'))
    }
  }

  private retrieveProfileFromAuth0 (token) {
    return this._auth0.client.userInfo(token, (err, profile) => {
      if (profile) {
        return this.userProfile = profile
      } else if (err) {
        console.error(`Error authenticating: ${err.error}`);
      }
    })
  }

  private _setSession(authResult) {
    // Save session data and update login status subject
    const expiresAt = JSON.stringify(authResult.expiresIn * 1000 + Date.now());
    // Set tokens and expiration in localStorage and props
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // Update login status in loggedIn$ stream
    this.setLoggedIn(true);
  }

  private _clearRedirect() {
    localStorage.removeItem('authRedirect');
  }

  logout() {
    // Ensure all auth items removed from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('authRedirect');
    this._clearRedirect();
    // Reset local properties, update loggedIn$ stream
    this.userProfile = undefined;
    this.setLoggedIn(false);
    // Return to homepage
    this.router.navigate(['/']);
  }

  get isAdmin(): boolean {
    // const roles = JSON.parse(localStorage.getItem('roles'))
    if (this.userProfile) {
      return this.userProfile['http://myapp.com/roles'].find((e) => e === 'admin')
    }
    return false
  }

  get tokenValid(): boolean {
    // Check if current time is past access token's expiration
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return Date.now() < expiresAt;
  }
}
