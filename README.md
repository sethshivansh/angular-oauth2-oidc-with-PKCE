# angular-oauth2-oidc-with-PKCE

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.5.

## Implementation Steps

### Installing NPM

`npm i angular-oauth2-oidc --save`

### Importing the NgModule

```TypeScript
  import { AuthConfig } from 'angular-oauth2-oidc';

  export const authCodeFlowConfig: AuthConfig = {
    // Url of the Identity Provider
    issuer: 'https://idsvr4.azurewebsites.net',

    // URL of the SPA to redirect the user to after login
    redirectUri: window.location.origin + '/index.html',

    // The SPA's id. The SPA is registerd with this id at the auth-server
    // clientId: 'server.code',
    clientId: 'spa',

    // Just needed if your auth server demands a secret. In general, this
    // is a sign that the auth server is not configured with SPAs in mind
    // and it might not enforce further best practices vital for security
    // such applications.
    // dummyClientSecret: 'secret',

    responseType: 'code',

    // set the scope for the permissions the client should request
    // The first four are defined by OIDC.
    // Important: Request offline_access to get a refresh token
    // The api scope is a usecase specific one
    scope: 'openid profile email offline_access api',

    showDebugInformation: true,
  };
```

After this, you can initialize the code flow using:

```TypeScript
this.oauthService.initCodeFlow();
```

There is also a convenience method `initLoginFlow` which initializes either the code flow or the implicit flow depending on your configuration.

```TypeScript
this.oauthService.initLoginFlow();
```

Also -- as shown in the readme -- you have to execute the following code when bootstrapping to make the library to fetch the token:

```TypeScript
this.oauthService.configure(authCodeFlowConfig);
this.oauthService.loadDiscoveryDocumentAndTryLogin();
```

### Logging out

The logOut method clears the used token store (by default ``sessionStorage``) and forwards the user to the auth servers logout endpoint if one was configured (manually or via the discovery document).

```typescript
this.oauthService.logOut();
```

If you want to revoke the existing access token and the existing refresh token before logging out, use the following method:

```typescript
this.oauthService.revokeTokenAndLogout();
```

### Skipping the Login Form

If you don't want to display a login form that tells the user that they are redirected to the identity server, you can use the convenience function `this.oauthService.loadDiscoveryDocumentAndLogin();` instead of `this.oauthService.loadDiscoveryDocumentAndTryLogin();` when setting up the library.

This directly redirects the user to the identity server if there are no valid tokens. Ensure you have your `issuer` set to your discovery document endpoint!

### Calling a Web API with an Access Token

You can automate this task by switching `sendAccessToken` on and by setting `allowedUrls` to an array with prefixes for the respective URLs. Use lower case for the prefixes.

```TypeScript
OAuthModule.forRoot({
    resourceServer: {
        allowedUrls: ['http://www.angular.at/api'],
        sendAccessToken: true
    }
})
```

If you need more versatility, you can look in the [documentation](https://manfredsteyer.github.io/angular-oauth2-oidc/docs/additional-documentation/working-with-httpinterceptors.html) how to setup a custom interceptor.

## Token Refresh

See docs: https://manfredsteyer.github.io/angular-oauth2-oidc/docs/additional-documentation/refreshing-a-token.html

## Routing

If you use the `PathLocationStrategy` (which is on by default) and have a general catch-all-route (`path: '**'`) you should be fine. Otherwise look up the section `Routing with the HashStrategy` in the [documentation](https://manfredsteyer.github.io/angular-oauth2-oidc/docs/).

## Implicit Flow

Nowadays, using code flow + PKCE -- as shown above -- is the recommended OAuth 2/OIDC flow for SPAs. To use the older implicit flow, lookup this docs: https://manfredsteyer.github.io/angular-oauth2-oidc/docs/additional-documentation/using-implicit-flow.html

## More Documentation (!)

See the [documentation](https://manfredsteyer.github.io/angular-oauth2-oidc/docs/) for more information about this library.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## References
https://www.npmjs.com/package/angular-oauth2-oidc

https://github.com/manfredsteyer/angular-oauth2-oidc
