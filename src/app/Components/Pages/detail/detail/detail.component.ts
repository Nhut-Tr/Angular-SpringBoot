import { TokenStorageService } from 'src/app/service/token-storage.service';
import { CheckoutService } from './../../../../service/checkout.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Checkout } from 'src/app/class/checkout';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private checkoutService: CheckoutService,
    private tokenService: TokenStorageService,
    private router: Router
  ) {}
  checkout: Checkout[] = [];
  subTotal: any;
  count: number = 0;
  tableSize: number = 5;
  listSize = [5, 10, 15, 20];
  page: number = 1;
  role: any;
  isAuth = false;
  ngOnInit(): void {
    const user = this.tokenService.getUser();
    this.role = user.roles;
    this.isAuth =
      this.role.includes('ROLE_MODERATOR') && this.role.includes('ROLE_ADMIN');
    this.getOrderDetailByOrderId();
  }

  getOrderDetailByOrderId() {
    const id = +this.route.snapshot.paramMap.get('orderId')!;
    this.checkoutService.getHistoryByOrderId(id).subscribe((data) => {
      this.checkout = data;
      this.subTotal = data.reduce((totals: any, current: any) => {
        return totals + current.products?.price * current.quantity;
      }, 0);
      console.log(data);
    });
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getOrderDetailByOrderId();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getOrderDetailByOrderId();
  }

  checkAuth() {
    const user = this.tokenService.getUser();
    this.role = user.roles;
    this.isAuth = this.role.includes('ROLE_ADMIN');
    if (this.isAuth) {
      this.router.navigate(['admin/order-manager']);
    }
    if (this.role.includes('ROLE_MODERATOR')) {
      this.router.navigate(['admin/order-manager']);
    }
    if (this.role.includes('ROLE_USER')) {
      this.router.navigate(['/history']);
    }
  }
}
