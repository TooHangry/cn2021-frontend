import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else {
      return true;
    }
    return false;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdmin implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log('guard', this.authService.isAuthenticated())
    if (!this.authService.isAuthenticated() || !this.authService.isAdmin()) {
      this.router.navigate(['/login']);
    } else {
      return true;
    }
    return false;
  }
}
