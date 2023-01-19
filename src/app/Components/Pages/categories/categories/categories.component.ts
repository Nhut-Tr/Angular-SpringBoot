import { HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { CartServiceService } from './../../../../service/cart-service.service';
import { Observable, Subscription, filter, max } from 'rxjs';

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductClass } from 'src/app/class/product-class.model';
import { ProductServiceService } from 'src/app/service/product-service.service';
import { UserService } from 'src/app/service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { Cart } from 'src/app/class/cart';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  products: any[] = [];
  price?: number;
  cart?: Cart;
  cartlist: Cart[] = [];
  userId?: number;
  dateTime?: Date;
  page: number = 1;
  count: number = 0;
  tableSize: number = 6;
  searchName = '';
  isLoggedIn = false;
  private roles: string[] = [];
  showAdminBoard = false;
  showUserBoard = false;
  paramURL: { page?: number; size?: number } = {};
  value!: { min: any; max: any };
  prices = [
    {
      min: 200,
      max: 600,
    },
    { min: 600, max: 1000 },
    {
      min: 1000,
      max: 1400,
    },
  ];
  selectStatus: any;
  @Output() newItemEvent = new EventEmitter<any>();
  constructor(
    private productService: ProductServiceService,
    private cartService: CartServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: NgToastService,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {
    // this.clearData();
    this.isLoggedIn = !!this.tokenStorage.getToken();
    const user = this.tokenStorage.getUser();
    this.roles = user.roles;
    this.showAdminBoard =
      this.roles.includes('ROLE_ADMIN') ||
      this.roles.includes('ROLE_MODERATOR');
    this.showUserBoard = this.roles.includes('ROLE_USER');
    this.route.queryParams.subscribe((res) => {
      this.page = !res['page'] ? 1 : res['page'];
      this.tableSize = !res['size'] ? 6 : res['size'];

      this.paramURL = {
        page: this.page,
        size: this.tableSize,
      };
      this.retrieveProduct();
      if (this.searchName || this.prices) {
        this.searchFunction();
      }
    });
  }

  retrieveProduct(): void {
    this.productService
      .getList(this.paramURL.page! - 1, this.paramURL.size!)
      .subscribe((data: any) => {
        this.products = data.content;
        this.count = data.totalElements;
      });
  }
  hasBlank(str: string) {
    return str === null || str.match(/^ *$/) !== null;
  }
  search() {
    if (this.hasBlank(this.searchName)) {
      this.retrieveProduct();
      return;
    }
    this.page = 1;
    this.productService
      .findProductByName(this.searchName, this.page - 1, this.tableSize)
      .subscribe({
        next: (data: any) => {
          this.products = data.content;
          this.count = data.totalElements;
        },
        error: (res) => {
          this.products = [];
          this.count = 0;
        },
      });
  }
  onTableDataChange(event: any) {
    this.paramURL = {
      page: event,
      size: this.tableSize,
    };
    this.addParam();
    console.log(this.paramURL);
    if (this.searchName || this.prices) {
      this.filterTable();
    } else {
      this.retrieveProduct();
    }
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.retrieveProduct();
  }

  addParam() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: this.paramURL,
    });
  }
  updateCart(id: number) {
    const pipe = new DatePipe('en-US'); // Use your own locale
    const now = Date.now();
    const myFormattedDate = pipe.transform(now, 'short');
    let total = 0;
    this.cartService.getCartByUserId(this.tokenStorage.getUser().id).subscribe(
      (data) => {
        this.cartlist = data;
        if (total === 0) {
          this.dateTime = new Date();
          let product = this.products?.find(
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
            },
            (err) => {
              this.toast.error({
                detail: 'Failed Message',
                summary: err.error.message,
                duration: 4000,
              });
            }
          );
        }
      },
      (error) => {
        console.log(error.error.status);
        if (error.error.status === 401) {
          const signOut = this.logout();
          this.toast.warning({
            detail: 'Failed Message',
            summary: 'Your account has been locked!',
            duration: 4000,
          });
          return signOut;
        }
      }
    );
  }
  logout() {
    if (this.isLoggedIn) {
      this.tokenStorage.signOut();
      // this.newItemEvent.emit();
      // this.isLoggedIn = false;
      // this.showAdminBoard = false;
      // this.showUserBoard = false;
    }
  }
  searchFunction() {
    this.addParam();
    if (this.searchName || this.prices) {
      this.paramURL.page = 1;
      this.filterTable();
    }
    this.filterTable();
  }
  filterTable() {
    this.productService
      .findProductAllField(
        this.searchName,
        this.value.min,
        this.value.max,
        true,
        this.page - 1,
        this.tableSize
      )
      .subscribe({
        next: (data: any) => {
          this.products = data.content;
          this.count = data.totalElements;
        },
        error: (res) => {
          this.products = [];
          this.count = 0;
        },
      });
  }
  clearData() {
    this.searchName = '';
    this.value = { min: 1, max: 9999999 };
    this.selectStatus = undefined;
    this.page = 1;
    this.paramURL = { page: 1, size: this.tableSize };
    this.addParam();
    this.retrieveProduct();
  }
}
