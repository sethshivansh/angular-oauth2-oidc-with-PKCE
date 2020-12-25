import { OAuthModuleConfig } from 'angular-oauth2-oidc';

export const authModuleConfig: OAuthModuleConfig = {
  resourceServer: {
    allowedUrls: ['<http://YOUR-API-SERVER-HOST>'],
    sendAccessToken: true,
  }
};
