import { CheckoutService } from './../../../service/checkout.service';
import { NgToastService } from 'ng-angular-popup';
import { ProductClass } from 'src/app/class/product-class.model';
import { CartServiceService } from 'src/app/service/cart-service.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { environment } from 'src/environments/environment';
import { Cart } from 'src/app/class/cart';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var paypal_sdk: any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CheckoutComponent implements OnInit {
  public payPalConfig?: IPayPalConfig;
  showSuccess!: any;
  cartTotal!: any;
  carts: Cart[] = [];
  product?: ProductClass;
  totalAll: number = 0;
  userId?: any;
  count: number = 0;
  paidFor = false;
  address: string = '';
  description: string = '';
  fullName: any = '';
  phoneNumber: string = '';
  submitted = false;
  checkoutForm!: FormGroup;
  cartStorageChange = new Subscription();
  @ViewChild('paypal', { static: false }) paypalElement?: ElementRef;

  constructor(
    private router: Router,
    private cartService: CartServiceService,
    private tokenStorageService: TokenStorageService,
    private toast: NgToastService,
    private tokenStorage: TokenStorageService,
    private checkoutService: CheckoutService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.checkValidate();
    this.initConfig();
    this.cartTotal =
      JSON.parse(localStorage.getItem('cart_total') as any) || [];
    this.cartStorageChange = this.cartService.cartServiceItem.subscribe(
      (data) => {
        for (let cart of data) {
          if (this.userId == cart.userId) {
            this.carts.push(cart);
          }
        }
        this.carts = data;
        this.totalAll = data.reduce((totals, current) => {
          return totals + current.products?.price * current.quantity;
        }, 0);
        this.count = data.reduce((totals, current) => {
          return totals + current.quantity;
        }, 0);
      }
    );
  }

  checkValidate() {
    this.checkoutForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/(84|0[3|5|7|8|9])+([0-9]{8})\b/),
        ],
      ],
      description: ['', Validators.required],
    });
    this.submitted = true;
    if (this.checkoutForm.invalid) {
      return;
    }
    alert('success!');
  }

  checkout() {
    const request = {
      userId: this.tokenStorage.getUser().id,
      totalPrice: this.totalAll,
      deliveryAddress: this.checkoutForm.value.address,
      phoneNumber: this.checkoutForm.value.phoneNumber,
      description: this.checkoutForm.value.description,
      quantity: this.count,
    };
    this.checkoutService.checkout(request).subscribe(
      (data) => {
        this.toast.success({
          detail: 'Success Message',
          summary: 'Check out success',
          duration: 5000,
        });
        console.log(115);
        this.cartService.cartServiceItem.next([]);
        this.router.navigate(['/history']);
      },
      (err) => {
        this.toast.warning({
          detail: 'Failed Message',
          summary: err.error.message,
          duration: 10000,
        });
        console.log(125);
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
    const id = this.tokenStorageService.getUser().id;
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
          if (this.checkoutForm.invalid) {
            this.toast.error({
              detail: 'Warning',
              summary: 'Please enter your information!!',
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
