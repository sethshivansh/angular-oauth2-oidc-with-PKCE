// import { Component } from '@angular/core';
// import { Observable } from 'rxjs';

// // import { AuthService } from './config/auth.service';
// // import { OAuthService, NullValidationHandler, AuthConfig } from 'angular-oauth2-oidc';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'oidc-authentication';

//   isAuthenticated: Observable<boolean>;
//   // isDoneLoading: Observable<boolean>;
//   // canActivateProtectedRoutes: Observable<boolean>;

//   // constructor (
//   //   private authService: AuthService,
//   // ) {
//   //   this.isAuthenticated = this.authService.isAuthenticated$;
//   //   this.isDoneLoading = this.authService.isDoneLoading$;
//   //   this.canActivateProtectedRoutes = this.authService.canActivateProtectedRoutes$;

//   //   this.authService.runInitialLoginSequence();
//   // }

//   constructor(private oauthService: OAuthService) {
//     // this.configure();
//   }

//   // authConfig: AuthConfig = {
//   //   issuer: 'https://keycloak.mwpdemos.com/auth/realms/master',
//   //   redirectUri: window.location.origin + '/dashboard',
//   //   clientId: 'test-client',
//   //   scope: 'openid profile email offline_access',
//   //   responseType: 'code',
//   //   // at_hash is not present in JWT token
//   //   disableAtHashCheck: true,
//   //   // showDebugInformation: true
//   // }
  
//   // public login() {
//   //   this.oauthService.initLoginFlow();
//   // }
  
//   // public logoff() {
//   //   alert("logout");
//   //   this.oauthService.logOut();
//   // }
  
//   // private configure() {
//   //   this.oauthService.configure(this.authConfig);
//   //   this.oauthService.tokenValidationHandler = new NullValidationHandler();
//   //   this.oauthService.loadDiscoveryDocumentAndTryLogin();
//   // }

//   // validatetoken(){
//   //   return this.oauthService.hasValidAccessToken();
//   // }
//   // userProfile(){
//   //   this.oauthService.loadUserProfile();
//   // }
// }

import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  isAuthenticated: Observable<boolean>;
  isDoneLoading: Observable<boolean>;
  canActivateProtectedRoutes: Observable<boolean>;

  constructor (
    private authService: AuthService,
  ) {
    this.isAuthenticated = this.authService.isAuthenticated$;
    this.isDoneLoading = this.authService.isDoneLoading$;
    this.canActivateProtectedRoutes = this.authService.canActivateProtectedRoutes$;

    this.authService.runInitialLoginSequence();
  }

  login() { this.authService.login(); }
  logout() { this.authService.logout(); }
  refresh() { this.authService.refresh(); }
  reload() { window.location.reload(); }
  clearStorage() { localStorage.clear(); }

  logoutExternally() {
    window.open(this.authService.logoutUrl);
  }

  get hasValidToken() { return this.authService.hasValidToken(); }
  get accessToken() { return this.authService.accessToken; }
  get refreshToken() { return this.authService.refreshToken; }
  get identityClaims() { return this.authService.identityClaims; }
  get idToken() { return this.authService.idToken; }
}
