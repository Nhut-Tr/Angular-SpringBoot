import { ProductServiceService } from 'src/app/service/product-service.service';
import { CheckoutService } from './../../../../../service/checkout.service';
import { UserService } from 'src/app/service/user.service';
import { ChartService } from './../../../../../service/chart.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { jsPDF } from 'jspdf';
import { Chart, registerables } from 'node_modules/chart.js';
import { DatePipe } from '@angular/common';
Chart.register(...registerables);
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  @ViewChild('content', { static: false }) el!: ElementRef;
  order: any;
  CreateDate: any[] = [];
  totalsUser: any;
  totalUsersDeactivated: any;
  totalUsersActivated: any;
  totalsOrder: any;
  totalProduct: any;
  totalProductActivated: any;
  totalProductDeactivated: any;
  totalSale: any;
  bestSale: {
    sold: number;
    id: any;
    img: string;
    price: number;
    name: string;
  }[] = [];
  nameProduct: any[] = [];
  sold: any[] = [];
  createAt = new Date();
  constructor(
    private chartService: ChartService,
    private userService: UserService,
    private checkoutService: CheckoutService,
    private productService: ProductServiceService,
    public datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.userService.getListUser(0, 99999999).subscribe((data: any) => {
      this.totalsUser = data.content.length;
    });
    this.userService.getListUsersActivated().subscribe((data) => {
      this.totalUsersActivated = data.length;
    });
    this.userService.getListUsersDeactivated().subscribe((data) => {
      this.totalUsersDeactivated = data.length;
    });
    this.checkoutService.getAllOrder(0, 999999).subscribe((data: any) => {
      this.totalsOrder = data.content.length;
    });

    this.productService.getListForAdmin(0, 999999).subscribe((data: any) => {
      this.totalProduct = data.content.length;
    });
    this.productService.getList(0, 999999999).subscribe((data: any) => {
      this.totalProductActivated = data.content.length;
    });
    this.productService
      .getListDeactivated(0, 999999999)
      .subscribe((data: any) => {
        this.totalProductDeactivated = data.content.length;
      });
    this.checkoutService.getTotalSales().subscribe((data) => {
      var num = this.numberWithCommas(data);
      this.totalSale = num;
    });
    this.checkoutService.getBestSale().subscribe((data) => {
      this.bestSale = data;
      if (this.bestSale != null) {
        for (let i = 0; i < this.bestSale.length; i++) {
          this.nameProduct.push(this.bestSale[i].name);
          this.sold.push(this.bestSale[i].sold);
        }
        this.RenderChart(this.nameProduct, this.sold);
      }
    });
  }
  numberWithCommas(x: any) {
    var parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }

  RenderChart(nameProduct: any, sold: any) {
    const myChart = new Chart('piechart', {
      type: 'bar',
      data: {
        labels: nameProduct,
        datasets: [
          {
            label: 'Sold',
            data: sold,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
  savePDF(): void {
    let pdf = new jsPDF('landscape', 'pt', 'a3');
    let latest_date = this.datepipe.transform(this.createAt, 'yyyy-MM-dd');
    pdf.html(this.el.nativeElement, {
      margin: [40, 60, 40, 60],
      width: 800,
      callback: (pdf) => {
        pdf.save('exportDashboard' + latest_date + '.pdf');
      },
    });
  }
  saveExcel() {
    this.productService.exportExcel().subscribe((data) => {
      const blob = new Blob([data], {
        type: 'application/application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml',
      });
      let newVariable: any = window.navigator;
      if (newVariable && newVariable.msSaveOrOpenBlob) {
        newVariable.msSaveOrOpenBlob(blob);
        return;
      }

      const datas = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = datas;
      let latest_date = this.datepipe.transform(this.createAt, 'yyyy-MM-dd');
      link.download = 'bestSale' + latest_date + '.xlsx';
      link.dispatchEvent(
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window,
        })
      );

      setTimeout(function () {
        window.URL.revokeObjectURL(datas);
        link.remove();
      }, 100);
    });
  }
}
