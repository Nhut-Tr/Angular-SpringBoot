import { Checkout } from './../../../class/checkout';
import { CheckoutService } from './../../../service/checkout.service';
import { ProductClass } from './../../../class/product-class.model';
import { Component, OnInit } from '@angular/core';

import { ProductServiceService } from '../../../service/product-service.service';
import { DatePipe } from '@angular/common';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { CartServiceService } from 'src/app/service/cart-service.service';
import { Cart } from 'src/app/class/cart';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  product?: ProductClass[];
  checkout?: Checkout[];
  cartlist: Cart[] = [];
  dateTime?: Date;
  cart?: Cart;
  bestSale: {
    sold: number;
    id: any;
    img: string;
    price: number;
    name: string;
  }[] = [];
  private roles: string[] = [];
  isAuth = false;
  constructor(
    private productService: ProductServiceService,
    private cartService: CartServiceService,
    private userService: UserService,
    private router: Router,
    private toast: NgToastService,
    private tokenStorage: TokenStorageService,
    private checkoutService: CheckoutService
  ) {}

  ngOnInit(): void {
    this.getProduct();
    this.getBestSale();
  }

  getProduct() {
    this.productService.getList(0, 8).subscribe((data: any) => {
      this.product = data.content;
    });
  }

  getBestSale() {
    this.checkoutService.getBestSale().subscribe((data: any) => {
      this.bestSale = data;
      console.log(this.bestSale);
    });
  }

  updateCart(id: number) {
    let total = 0;
    const user = this.tokenStorage.getUser();

    if (user === null) {
      this.toast.warning({
        detail: 'Fail Message',
        summary: 'Please login to buy products',
        duration: 4000,
      });
      this.router.navigate(['/login']);
      return;
    }
    this.cartService.getCartByUserId(user.id).subscribe(
      (data) => {
        this.cartlist = data;
        if (total === 0) {
          this.dateTime = new Date();
          let product = this.product?.find(
            (product: ProductClass) => product.id === id
          );
          this.cart = {
            id: null,
            userId: this.tokenStorage.getUser().id,
            quantity: 1,
            productId: product?.id,
            price: product?.price,
          };
          this.cartService.save(this.cart).subscribe(
            (data) => {
              this.roles = this.tokenStorage.getUser().roles;
              if (
                (this.isAuth =
                  this.roles.includes('ROLE_ADMIN') ||
                  this.roles.includes('ROLE_MODERATOR'))
              ) {
                this.toast.warning({
                  detail: 'Fail Message',
                  summary: 'Can not buy because you are admin!',
                  duration: 4000,
                });
                return;
              } else {
                this.cartService
                  .getCartByUserId(this.tokenStorage.getUser().id)
                  .subscribe({
                    next: (datas) => {
                      this.cartService.cartServiceItem.next(datas);
                      this.toast.success({
                        detail: 'Add To Cart Message',
                        summary: 'Add product to cart success!',
                        duration: 4000,
                      });
                    },
                  });
              }
            },
            (err) => {
              this.toast.error({
                detail: 'Fail Message',
                summary: err.error.message,
                duration: 4000,
              });
            }
          );
        }
      },
      (err) => {
        console.log(err);
        this.toast.warning({
          detail: 'Fail Message',
          summary: 'Please login to buy products',
          duration: 4000,
        });
        this.router.navigate(['/login']);
      }
    );
  }

  checkAuth() {
    this.roles = this.tokenStorage.getUser().roles;
    if (
      (this.isAuth =
        this.roles.includes('ROLE_ADMIN') ||
        this.roles.includes('ROLE_MODERATOR'))
    ) {
      this.toast.warning({
        detail: 'Fail Message',
        summary: 'Can not buy because you are admin!',
        duration: 4000,
      });
      this.router.navigate(['/home']);
    }
  }
}
