import { TokenStorageService } from './../service/token-storage.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizeGuard implements CanActivate {
  constructor(
    private tokenService: TokenStorageService,
    private router: Router
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!(this.tokenService.getUser() && this.tokenService.getUser().id)) {
      this.router.navigate(['/login']);
      return false;
    } else {
      if (
        this.tokenService.getUser() &&
        this.tokenService.getUser().roles.includes('ROLE_USER')
      ) {
        this.router.navigate(['/']);
        return false;
      } else {
        return true;
      }
    }
  }
}
