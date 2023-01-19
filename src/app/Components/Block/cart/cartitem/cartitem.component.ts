import { Router } from '@angular/router';
import { CheckoutService } from './../../../../service/checkout.service';
import { ProductServiceService } from './../../../../service/product-service.service';
import { filter, Subscription } from 'rxjs';
import { UserService } from './../../../../service/user.service';
import { TokenStorageService } from './../../../../service/token-storage.service';
import { ProductClass } from 'src/app/class/product-class.model';
import { CartServiceService } from './../../../../service/cart-service.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cart } from 'src/app/class/cart';
import { NgToastService } from 'ng-angular-popup';
import { render } from 'creditcardpayments/creditCardPayments';
@Component({
  selector: 'app-cartitem',
  templateUrl: './cartitem.component.html',
  styleUrls: ['./cartitem.component.css'],
})
export class CartitemComponent implements OnInit, OnDestroy {
  product?: ProductClass;
  products?: ProductClass[];
  carts: Cart[] = [];
  cart?: Cart;
  total: number = 0;
  currentCart?: Cart;
  currentIndex = -1;
  totalAll: number = 0;
  totalInput?: number;
  count: number = 0;
  userId?: number;
  cartObj = [];
  isTempy = false;
  show = false;
  tableSize: number = 3;
  listSize = [3, 6, 9, 12, 15];
  page: number = 1;
  autohide = true;
  isDisable = false;
  cartStorageChange = new Subscription();

  constructor(
    private cartService: CartServiceService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private userService: UserService,
    private toast: NgToastService
  ) {}
  ngOnDestroy(): void {
    if (this.cartStorageChange) {
      this.cartStorageChange.unsubscribe();
    }
  }

  ngOnInit(): void {
    const userName = this.tokenStorage.getUser().id;
    this.cartService.getCartByUserId(userName).subscribe((data) => {
      this.cartService.cartServiceItem.next(data);
    });
    this.userService
      .getUserById(userName)
      .subscribe((data) => (this.userId = data.id));
    this.cartStorageChange = this.cartService.cartServiceItem.subscribe(
      (data) => {
        for (let cart of data) {
          if (this.userId == cart.userId) {
            this.carts.push(cart);
          }
        }
        this.carts = data;
        console.log(data);
        this.totalAll = data.reduce((totals, current) => {
          console.log(current);
          return totals + current.products?.price * current.quantity;
        }, 0);
        this.count = data.reduce((totals, current) => {
          return totals + current.quantity;
        }, 0);
      }
    );
  }

  getAll() {
    this.cartService.getAll().subscribe((data) => {
      for (let cart of data) {
        if (this.userId == cart.userId) {
          this.carts.push(cart);
        }
      }
      this.carts = data;
    });
  }

  deleteCart(id: number) {
    this.cartService.delete(id).subscribe((data) => {
      this.cartService
        .getCartByUserId(this.tokenStorage.getUser().id)
        .subscribe((datas) => {
          this.cartService.cartServiceItem.next(datas);
        });
    });
    this.currentCart = undefined;
    this.currentIndex = -1;
  }

  addTotals(id: number, quantity: number, productId: number, price: any) {
    quantity = quantity + 1;

    if (quantity >= 10) {
      this.toast.warning({
        detail: 'Warning quantity',
        summary: 'Do not pass 10 items',
        duration: 5000,
      });
      this.isDisable = true;
      quantity = 10;
    }
    const cart = {
      id: id,
      userId: this.tokenStorage.getUser().id,
      quantity,
      productId,
      price,
    };
    this.cartService.update(cart).subscribe(
      (data) => {
        this.cartService
          .getCartByUserId(this.tokenStorage.getUser().id)
          .subscribe((datas) => {
            this.cartService.cartServiceItem.next(datas);
          });
      },
      (err) => {
        this.toast.error({
          detail: 'Warning quantity',
          summary: err.error.message,
          duration: 5000,
        });
      }
    );
  }

  minusTotals(id: number, quantity: number, productId: number, price: any) {
    // this.dateTime = new Date;
    const cart = { id: id, userId: this.tokenStorage.getUser().id };
    quantity = quantity - 1;
    if (quantity === 0) {
      this.deleteCart(id);
    } else {
      const cart = {
        id: id,
        userId: this.tokenStorage.getUser().id,
        quantity,
        productId,
        price,
      };
      this.cartService.update(cart).subscribe((data) => {
        this.cartService
          .getCartByUserId(this.tokenStorage.getUser().id)
          .subscribe((datas) => {
            this.cartService.cartServiceItem.next(datas);
          });
      });
    }
    if (quantity < 10) {
      this.isDisable = false;
    }
  }

  checkout() {
    this.router.navigate(['/checkout']);
  }
  onTableDataChange(event: any) {
    this.page = event;
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }
}
