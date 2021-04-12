import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public jwtHelper: JwtHelperService) { }
  public isAuthenticated(): boolean {
    const tokenVal = localStorage.getItem('token');
    const token = tokenVal ? tokenVal : '';
    const isAuthenticated = token !== '' && !this.jwtHelper.isTokenExpired(token);
    return isAuthenticated;
  }

  public isAdmin(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return this.jwtHelper.decodeToken(this.getToken()).isAdmin;
    }
    return false;
  }


  public getToken(): string {
    const token = localStorage.getItem('token');
    return token ? token : '';
  }

  public getID(): number | null {
    const val = this.jwtHelper.decodeToken(this.getToken());
    return val ? val.id : null;
  }

  public setToken(token: any): void {
    const jwtToken = token;
    localStorage.setItem('token', jwtToken);
  }

  public logout(): void {
    localStorage.removeItem('token');
  }
}
