import { map } from 'rxjs';
import { Order } from './../../../class/order';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { Checkout } from './../../../class/checkout';
import { CheckoutService } from './../../../service/checkout.service';
import { CartServiceService } from './../../../service/cart-service.service';
import { Router } from '@angular/router';
import { ProductClass } from 'src/app/class/product-class.model';
@Component({
  selector: 'app-history-cart',
  templateUrl: './history-cart.component.html',
  styleUrls: ['./history-cart.component.css'],
})
export class HistoryCartComponent implements OnInit {
  checkout?: Checkout;
  products?: ProductClass[];
  orders: Order[] = [];
  orr?: Order;
  count: number = 0;
  tableSize: number = 5;
  listSize = [5, 10, 15, 20];
  page: number = 1;
  listStatus = [
    {
      status: 1,
      name: 'To Pay',
    },
    {
      status: 2,
      name: 'To Ship',
    },
    {
      status: 3,
      name: 'To Receive',
    },
    {
      status: 4,
      name: 'Completed',
    },
  ];

  displayStatus(status: number) {
    return this.listStatus.find((e) => e.status === status)?.name;
  }
  constructor(
    private router: Router,
    private cartService: CartServiceService,
    private checkoutService: CheckoutService,
    private tokenService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.cartService.cartServiceItem.subscribe((data) => {
      this.getHistory();
    });
  }

  getHistory() {
    const userId = this.tokenService.getUser().id;
    this.checkoutService.getHistoryByUserId(userId).subscribe((data) => {
      const tmp = data.map((item: any) => {
        return JSON.stringify(item.orders);
      });
      this.orders = <Order[]>[...new Set(tmp)].map((o: any) => JSON.parse(o));
    });
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getHistory();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getHistory();
  }
}
