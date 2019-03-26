// seisewa.module.ts

import { OktaAuthModule, OktaCallbackComponent } from "@okta/okta-angular";
import { environment } from 'src/environments/environment';

const config = {
  issuer: `${environment.Oauth2_issuer}`,
  redirectUri: `${environment.Oauth2_redirectUrl}`,
  clientId: `${environment.Oauth2_clientid}`
};
