import { Checkout } from './../../../../../class/checkout';
import { Order } from './../../../../../class/order';
import { CheckoutService } from './../../../../../service/checkout.service';
import { Component, OnInit, Pipe } from '@angular/core';
import { NgConfirmService } from 'ng-confirm-box';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { Router } from '@angular/router';
import {
  NgbDate,
  NgbCalendar,
  NgbDateParserFormatter,
} from '@ng-bootstrap/ng-bootstrap';

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-order-manager',
  templateUrl: './order-manager.component.html',
  styleUrls: ['./order-manager.component.css'],
  providers: [DatePipe],
})
export class OrderManagerComponent implements OnInit {
  order: Order[] = [];
  hoveredDate: NgbDate | null = null;
  checkout: Checkout[] = [];
  fromDate!: NgbDate | null;
  toDate!: NgbDate | null;
  currentOrder?: Order;
  currentIndex = -1;
  name = '';
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  listSize = [10, 15, 20];
  searchName: any;
  isAuth = false;
  private role: string[] = [];
  selectStatus: any;
  status: any;
  flag: any;
  todayDate: any;
  today = new Date();
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
    private checkoutService: CheckoutService,
    private router: Router,
    private confirmService: NgConfirmService,
    private tokenService: TokenStorageService,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private pipe: DatePipe
  ) {}

  ngOnInit(): void {
    const current = new Date();
    this.todayDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate(),
    };
    const user = this.tokenService.getUser();
    this.role = user.roles;
    this.isAuth = this.role.includes('ROLE_MODERATOR');
    this.getOrder();
  }

  getOrder(): void {
    this.checkoutService.getAllOrder(this.page - 1, this.tableSize).subscribe(
      (data: any) => {
        this.order = data.content;
        this.count = data.totalElements;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // getTotal(orderId: any) {
  //   this.checkoutService.getTotalForOrder(orderId).subscribe((data) => {
  //     this.order = this.order.map((e) => {
  //       if (e.id === orderId) {
  //         return { ...e, total: (e.total = data) };
  //       } else {
  //         return { ...e, total: 0 };
  //       }
  //     });
  //   });
  // }
  onChangeStatus() {
    this.page = 1;
  }

  onTableDataChange(event: any) {
    this.page = event;
    if (this.status && !this.fromDate && !this.toDate) {
      this.findByStatus();
      return;
    }
    if (this.fromDate && this.toDate && !this.status) {
      this.findDate();
      return;
    }
    if (this.fromDate && this.toDate && this.status) {
      this.findByStatusAndDate();
      return;
    }
    this.getOrder();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getOrder(), this.findDate();
  }

  refreshList(): void {
    this.getOrder();
    this.currentOrder = undefined;
    this.currentIndex = -1;
  }

  updateOrder(id: number) {
    this.router.navigate(['/admin/update-order', id]);
  }

  getnameJson(roleName: any) {
    return roleName[0]?.name;
  }

  onDateSelection(date: NgbDate) {
    this.page = 1;
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (
      this.fromDate &&
      !this.toDate &&
      date &&
      date.after(this.fromDate)
    ) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed))
      ? NgbDate.from(parsed)
      : currentValue;
  }
  convertDateToString(date: Date): string {
    return this.pipe.transform(date, 'yyyy-MM-dd')!;
  }
  findDate() {
    if (this.fromDate && this.toDate && !this.status) {
      const request = {
        start: this.convertDateToString(
          new Date(
            this.fromDate?.year!,
            this.fromDate?.month! - 1,
            this.fromDate?.day
          )
        ),
        finish: this.convertDateToString(
          new Date(
            this.toDate?.year!,
            this.toDate?.month! - 1,
            this.toDate?.day
          )
        ),
      };
      this.checkoutService
        .findByCreateAt(request, this.page - 1, this.tableSize)
        .subscribe((data: any) => {
          this.order = data.content;
          this.count = data.totalElements;
        });
    }
    if (!this.fromDate && !this.toDate && this.selectStatus !== null) {
      this.findByStatus();
    }
    if (this.fromDate && this.toDate && this.selectStatus !== null) {
      this.findByStatusAndDate();
    }
  }
  reset() {
    this.refreshList();
    this.fromDate = null;
    this.toDate = null;
    this.selectStatus = null;
    this.status = null;
    this.page = 1;
  }

  findByStatus() {
    if (this.selectStatus) {
      this.status = this.selectStatus.status;
      this.checkoutService
        .findByStatus(this.status, this.page - 1, this.tableSize)
        .subscribe({
          next: (data: any) => {
            this.order = data.content;
            this.count = data.totalElements;
          },
          error: (res) => {
            this.order = [];
            this.count = 0;
          },
        });
    }
  }

  findByStatusAndDate() {
    if (this.selectStatus && this.fromDate && this.toDate !== null) {
      const request = {
        start: this.convertDateToString(
          new Date(
            this.fromDate?.year!,
            this.fromDate?.month! - 1,
            this.fromDate?.day
          )
        ),
        finish: this.convertDateToString(
          new Date(
            this.toDate?.year!,
            this.toDate?.month! - 1,
            this.toDate?.day
          )
        ),
        status: this.selectStatus.status,
      };
      this.checkoutService
        .findByStatusAndDate(request, this.page - 1, this.tableSize)
        .subscribe((data: any) => {
          this.order = data.content;
          this.count = data.totalElements;
        });
    }
  }
}
