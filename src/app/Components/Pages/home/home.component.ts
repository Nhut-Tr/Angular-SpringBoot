import { Checkout } from './../../../class/checkout';
import { CheckoutService } from './../../../service/checkout.service';
import { ProductClass } from './../../../class/product-class.model';
import { Component, OnInit } from '@angular/core';

import { ProductServiceService } from '../../../service/product-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  product?: ProductClass[];
  checkout?: Checkout[];
  constructor(
    private productService: ProductServiceService,
    private checkoutService: CheckoutService
  ) {}

  ngOnInit(): void {
    this.getProduct();
    this.getBestSale();
  }

  getProduct() {
    this.productService.getList().subscribe((data) => {
      this.product = data;
    });
  }

  getBestSale() {
    this.checkoutService.getBestSale().subscribe((data) => {
      this.checkout = data;
    });
  }
}
