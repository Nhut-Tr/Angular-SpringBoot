import { NgToastService } from 'ng-angular-popup';
import { CheckoutService } from './../../../../../service/checkout.service';
import { Order } from './../../../../../class/order';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.css'],
})
export class UpdateOrderComponent implements OnInit {
  id: any;
  order: Order = new Order();
  selectStatus: any;
  data: any;
  orderData: any;
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
    private route: ActivatedRoute,
    private router: Router,
    private checkoutService: CheckoutService,
    private toastService: NgToastService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.checkoutService.getOrderById(this.id).subscribe(
      (data) => {
        this.order = data;
        this.selectStatus = this.listStatus.find(
          (e) => e.status === this.order.status
        );
        console.log(this.selectStatus);
      },
      (error) => console.log(error)
    );
  }
  updateOrder() {
    this.checkoutService
      .updateOrder(this.order.id, { status: this.selectStatus.status })
      .subscribe(
        (data) => {
          console.log(data);
          this.order = new Order();
          // this.gotoList();
          this.toastService.success({
            detail: 'Message',
            summary: 'Update Successfully!',
            duration: 4000,
          });
          this.back();
        },
        (error) =>
          this.toastService.error({
            detail: 'Message',
            summary: 'Update Failed!',
            duration: 4000,
          })
      );
  }

  back() {
    this.router.navigate(['/admin/order-manager']);
  }
  // onChangeStatus(event: any) {
  //   this.selectStatus = this.listStatus.filter(
  //     (list: any) => list.name === event.target.value
  //   )[0];
  //   console.log(this.selectStatus);
  // }
}
