// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_Gateway_Base: "https://0091259a-112a-4196-ac71-7abe2acab76c.mock.pstmn.io/api/v1",
  Oauth2_issuer: "https://dev-209802.okta.com/oauth2/default",
  Oauth2_redirectUrl: "http://localhost:8080/implicit/callback",
  Oauth2_clientid: process.env.OAUTH2_CLIENTID
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
