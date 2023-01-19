import { AppComponent } from './../../../app.component';

import { TokenStorageService } from './../../../service/token-storage.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartServiceService } from 'src/app/service/cart-service.service';
import { Users } from 'src/app/class/users';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  private roles: string[] = [];
  currentUser = null;
  showAdminBoard = false;
  showUserBoard = false;
  cartStorageChange = new Subscription();
  count: number = 0;
  name?: string;
  user!: Users;
  @Output() newItemEvent = new EventEmitter<any>();
  username?: string;

  constructor(
    private tokenStorageService: TokenStorageService,
    private cartService: CartServiceService
  ) {}

  ngOnInit(): void {
    if (this.tokenStorageService.getUser()) {
      this.tokenStorageService.currentUser.next(
        this.tokenStorageService.getUser()
      );
    }
    this.tokenStorageService.currentUser.subscribe((data) => {
      console.log('aaa' + data);
      this.user = data;
      if (data) {
        this.name = data.fullName;
        this.roles = this.user.roles;
        this.showAdminBoard =
          this.roles.includes('ROLE_ADMIN') ||
          this.roles.includes('ROLE_MODERATOR');
        this.showUserBoard = this.roles.includes('ROLE_USER');
        this.username = this.user.username;
        this.getCartOk(this.user.id);
      } else {
        this.showAdminBoard = false;
        this.showUserBoard = false;
        this.cartService.cartServiceItem.next([]);
      }
    });

    this.cartStorageChange = this.cartService.cartServiceItem.subscribe(
      (data) => {
        this.count = data.reduce((totals, current) => {
          return totals + current.quantity;
        }, 0);
      }
    );
  }

  getCartOk(userId: any) {
    this.cartService.getCartByUserId(userId).subscribe((data) => {
      this.cartService.cartServiceItem.next(data);
    });
  }
  logout() {
    this.tokenStorageService.signOut();
  }
}

// public isAdmin(){
// this.roles = this.tokenStorageService.getUser().roles;
// this.tokenStorageService.getUser().roles;
//  console.log(this.roles);
//  if(this.tokenStorageService.getUser().roles==='ROLE_ADMIN'){

//  }
// }
