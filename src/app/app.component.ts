import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CartServiceService } from './service/cart-service.service';
import { Component, EventEmitter, Output, OnDestroy } from '@angular/core';
import { TokenStorageService } from './service/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  private roles: string[] = [];
  currentUserSubscription!: Subscription;
  showUserBoard = false;
  showAdminBoard = false;
  public isUserLoggedIn: boolean = false;
  constructor(
    private tokenStorageService: TokenStorageService,
    private cartService: CartServiceService,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    if (this.currentUserSubscription) {
      this.currentUserSubscription.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.getUserLogged();
    if (this.tokenStorageService.getUser()) {
    }
  }
  logout(): void {
    this.tokenStorageService.signOut();
  }

  getUserCurrentChat() {
    return this.tokenStorageService.getUser().fullName;
  }

  getUserLogged() {
    this.currentUserSubscription =
      this.tokenStorageService.currentUser.subscribe((data) => {
        console.log(data);
        if (data) {
          this.roles = data.roles;
          this.showUserBoard = this.roles.includes('ROLE_USER');
          this.showAdminBoard =
            this.roles.includes('ROLE_ADMIN') ||
            this.roles.includes('ROLE_MODERATOR');
          this.cartService.getCartByUserId(data.id).subscribe((datas) => {
            this.cartService.cartServiceItem.next(datas);
            console.log(datas);
          });
        } else {
          this.showUserBoard = false;
          this.showAdminBoard = false;
        }
      });
  }
}
