import { Component } from '@angular/core';
import {OAuthService, JwksValidationHandler} from 'angular-oauth2-oidc';
import { authConfig } from './sso.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sso_oauth';
  
  constructor(private oauthService:OAuthService)
  {
    this.configureSSO();
  }
  configureSSO()
  {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler=new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndLogin();
  }

  // login(){

  //   this.oauthService.initImplicitFlow();
  // }
  logout(){

    this.oauthService.logOut();
  }

  get token()
  {
    let claims:any=this.oauthService.getIdentityClaims();
    return claims ?claims :null;
  }
}
