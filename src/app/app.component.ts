import { Router } from '@angular/router';
import { CartServiceService } from './service/cart-service.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { TokenStorageService } from './service/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private roles: string[] = [];
  isLoggedIn = false;
  showUserBoard = false;
  showAdminBoard = false;
  public isUserLoggedIn: boolean = false;
  constructor(
    private tokenStorageService: TokenStorageService,
    private cartService: CartServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showUserBoard = this.roles.includes('ROLE_USER');
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      if (this.showAdminBoard == true) {
        this.router.navigate(['/admin/user-list']);
      }
      if (this.showUserBoard == true) {
      }
    }
    this.cartService
      .getCartByUserId(this.tokenStorageService.getUser().id)
      .subscribe((datas) => {
        this.cartService.cartServiceItem.next(datas);
        console.log(datas);
      });
  }
  logout(): void {
    this.tokenStorageService.signOut();
    this.isLoggedIn = false;
    this.showUserBoard = false;
    this.showAdminBoard = false;
  }
}
