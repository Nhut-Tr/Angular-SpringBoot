import { BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { Users } from '../class/users';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  currentUser = new BehaviorSubject<any>(null);
  constructor(private router: Router, private route: ActivatedRoute) {}

  signOut(): void {
    window.localStorage.clear();
    this.router.navigate(['/login']);
    this.currentUser.next(null);
  }

  public saveToken(token: string) {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return null;
  }

  // public isLogin():void{

  //   return this.getToken() && this.getUser();
  // }
}
