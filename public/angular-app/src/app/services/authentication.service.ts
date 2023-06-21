import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private _jwt: JwtHelperService) { }

  setLogin(token: string) {
    sessionStorage.setItem("token", token);
  }

  isLoggedIn() {
    return this.token !== null;
  }

  logout() {
    sessionStorage.removeItem("token");
  }

  get token(): string | null {
    return sessionStorage.getItem("token");
  }
  
  get name() {
    const token = this.token as string;
    return this._jwt.decodeToken(token).name;
  }
}
