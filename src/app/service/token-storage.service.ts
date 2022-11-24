import { Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor(private router:Router,private route:ActivatedRoute) { }

  signOut(): void {
    window.localStorage.clear();
    this.router.navigate(['/home']);
    // location.reload();
   
   
  }
  // public setRoles(roles: []){
  //   localStorage.setItem('roles',JSON.stringify(roles));
  // }

  // public getRoles(roles:string[]){
  //   return localStorage.getItem('roles');
  // }
  public saveToken(token: string){
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

    return {};
  }


  

  // public isLogin():void{
    
  //   return this.getToken() && this.getUser();
  // }
}