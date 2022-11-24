import { AppComponent } from './../../../app.component';


import { TokenStorageService } from './../../../service/token-storage.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartServiceService } from 'src/app/service/cart-service.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showUserBoard = false;
  cartStorageChange = new Subscription();
  count :number=0;
  @Output() newItemEvent = new EventEmitter<any>();
  username?: string;

  constructor(private tokenStorageService: TokenStorageService,private route:ActivatedRoute,private router:Router, private appCom:AppComponent, private cartService: CartServiceService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
     
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showUserBoard = this.roles.includes('ROLE_USER');

      this.username = user.username;
    }
    this.cartStorageChange = this.cartService.cartServiceItem.subscribe( (data) => {this.count = data.reduce((totals, current) => {
      return totals + current.quantity;
    }, 0);
  }
);
  }

  logout() {
      this.newItemEvent.emit();
      this.isLoggedIn = false;
      this.showAdminBoard = false;
      this.showUserBoard = false;
    }
  }
  

  // public isAdmin(){
  // this.roles = this.tokenStorageService.getUser().roles;
  // this.tokenStorageService.getUser().roles;
  //  console.log(this.roles);
  //  if(this.tokenStorageService.getUser().roles==='ROLE_ADMIN'){

  //  }
  // }

