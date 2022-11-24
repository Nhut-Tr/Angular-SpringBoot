import { CheckoutService } from './../../../service/checkout.service';
import { NgToastService } from 'ng-angular-popup';
import { ProductClass } from 'src/app/class/product-class.model';
import { CartServiceService } from 'src/app/service/cart-service.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { environment } from 'src/environments/environment';
import { Cart } from 'src/app/class/cart';
import { Subscription } from 'rxjs';
declare var paypal_sdk: any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  public payPalConfig?: IPayPalConfig;
  showSuccess!: any;
  cartTotal!: any;
  carts: Cart[] = [];
  product?: ProductClass;
  totalAll: number = 0;
  userId?: number;
  count: number = 0;
  paidFor = false;
  address: string = '';
  name: any='';
  phonenumber?: number;
  cartStorageChange = new Subscription();
  @ViewChild('paypal', { static: false }) paypalElement?: ElementRef;

  constructor(
    private router: Router,
    private cartService: CartServiceService,
    private tokenStogareService: TokenStorageService,
    private toast: NgToastService,
    private tokenStorage: TokenStorageService,
    private checkoutService: CheckoutService
  ) {}

  ngOnInit(): void {
    this.initConfig();
    this.cartTotal =
      JSON.parse(localStorage.getItem('cart_total') as any) || [];
    console.log(this.cartTotal);

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
  // invalid(){
  //     if(this.address == ""){
  //       this.toast.warning({
  //         detail: 'Warning',
  //         summary: 'Please enter your address!',
  //         duration: 5000,
  //       });
  //     }else{
  //       this.router.navigate(['/checkout']);
  //   }
  // }
  checkout() {
      const request = {
        userId: this.tokenStorage.getUser().id,
        totalPrice: this.totalAll,
        deliveryAddress: this.address,
        quantity: this.count,
      };
      console.log(this.address);
      this.checkoutService.checkout(request).subscribe(
        (data) => {
          this.toast.success({
            detail: 'Success Message',
            summary: 'Check out success',
            duration: 5000,
          });
          this.cartService.cartServiceItem.next([]);
          this.router.navigate(['/history']);


        },
        (err) => {
          this.toast.warning({
            detail: 'Failed Message',
            summary: 'Check out fail, Try again later!',
            duration: 5000,
          });
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
  getCart() {
    const id = this.tokenStogareService.getUser().id;
    this.cartService.getCartByUserId(id).subscribe((data) => {
      this.carts = data;
      console.log(data);
    });
  }
  private initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: `${environment.Client_ID}`,
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: `${this.totalAll}`,
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    value: `${this.totalAll}`,
                  },
                },
              },
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (data, actions) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get().then((details: any) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
        });
      },
      onClientAuthorization: (data) => {
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );
        if (data.status === 'COMPLETED') {
          // this.router.navigate(['/history']);
            if (this.address == '') {
              this.toast.error({
                detail: 'Warning',
                summary: 'Please enter your infomation!!',
                duration: 5000,
              });
            } else {
          this.checkout();
          this.showSuccess = true;
          this.toast.success({
            detail: 'Message',
            summary: 'Successful Pay',
            duration: 4000,
          });

          this.router.navigate(['/history']);
            }
        }
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: (err) => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }
}
