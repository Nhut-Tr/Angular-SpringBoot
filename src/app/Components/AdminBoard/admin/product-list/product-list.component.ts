import { Router, ActivatedRoute } from '@angular/router';
import { ProductClass } from 'src/app/class/product-class.model';
import { ProductServiceService } from 'src/app/service/product-service.service';
import { Component, OnInit } from '@angular/core';
import { NgConfirmService } from 'ng-confirm-box';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { LabelType, Options } from '@angular-slider/ngx-slider';
import { max } from 'rxjs';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: ProductClass[] = [];
  currentProducts?: ProductClass;
  currentIndex = -1;
  name = '';
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  searchName = '';
  listSize = [5, 10, 15];
  isAuth = false;
  private role: string[] = [];
  selectStatus: any;
  paramURL: { page?: number; size?: number } = {};
  listStatus = [
    {
      status: false,
      name: 'INACTIVE',
    },
    {
      status: true,
      name: 'ACTIVE',
    },
  ];
  minValue: number = 0;
  maxValue: number = 5000;
  options: Options = {
    floor: 0,
    ceil: 5000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return (
            '<b style="font-size:13px;color:white;font-weight:bold;">Price: $</b>' +
            '<span style="color:white">' +
            value +
            '</span>'
          );
        case LabelType.High:
          return (
            '<b style="font-size:13px;color:white;font-weight:bold;">$</b>' +
            '<span style="color:white">' +
            value +
            '</span>'
          );
        default:
          return '$' + value;
      }
    },
  };
  constructor(
    private productService: ProductServiceService,
    private router: Router,
    private confirmService: NgConfirmService,
    private tokenService: TokenStorageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const user = this.tokenService.getUser();
    this.role = user.roles;
    this.isAuth = this.role.includes('ROLE_MODERATOR');

    this.route.queryParams.subscribe((res) => {
      this.page = !res['page'] ? 1 : res['page'];
      this.tableSize = !res['size'] ? 5 : res['size'];

      this.paramURL = {
        page: this.page,
        size: this.tableSize,
      };

      if (
        this.searchName ||
        this.minValue ||
        this.maxValue ||
        this.selectStatus
      ) {
        this.filterTable();
      } else {
        this.getProduct();
      }
    });
  }
  getProduct(): void {
    console.log();
    this.productService
      .getListForAdmin(this.paramURL.page! - 1, this.paramURL.size!)
      .subscribe((data: any) => {
        this.products = data.content;
        this.count = data.totalElements;
      });
  }
  hasBlank(str: string) {
    return str === null || str.match(/^ *$/) !== null;
  }
  // search() {
  //   if (this.hasBlank(this.searchName)) {
  //     this.getProduct();
  //     return;
  //   }
  //   this.page = 1;
  //   this.productService
  //     .findProductByNameAdmin(this.searchName, this.page - 1, this.tableSize)
  //     .subscribe({
  //       next: (data: any) => {
  //         this.products = data.content;
  //         this.count = data.totalElements;
  //       },
  //       error: (res) => {
  //         this.products = [];
  //         this.count = 0;
  //       },
  //     });
  // }
  onTableDataChange(event: any) {
    this.page = event;
    console.log(this.page);
    this.paramURL = { page: this.page, size: this.tableSize };
    this.addParam();
    if (
      this.searchName ||
      this.minValue ||
      this.maxValue ||
      this.selectStatus
    ) {
      this.filterTable();
    } else {
      this.getProduct();
    }
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.paramURL = { page: this.page, size: this.tableSize };
    this.addParam();
    if (
      this.searchName ||
      this.minValue ||
      this.maxValue ||
      this.selectStatus
    ) {
      this.searchFunction();
    } else {
      this.getProduct();
    }
  }

  addParam() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: this.paramURL,
    });
  }
  refreshList(): void {
    this.getProduct();
    this.currentProducts = undefined;
    this.page = 1;
  }

  setActiveProduct(products: ProductClass, index: number): void {
    this.currentProducts = products;
    this.currentIndex = index;
  }

  removeAllTutorials(): void {
    this.productService.deleteAll().subscribe(
      (response) => {
        console.log(response);
        this.refreshList();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateProduct(id: number) {
    this.router.navigate(['/admin/update-product', id]);
  }

  deleteProduct(id: number) {
    this.confirmService.showConfirm(
      'Are you want to inactive this product?',
      () => {
        this.productService.setStatusProduct(id, false).subscribe((data) => {
          console.log(data);
          this.refreshList();
        });
      },
      () => {}
    );
  }

  searchFunction() {
    this.filterTable();
  }
  filterTable() {
    this.productService
      .findProductAllField(
        this.searchName,
        this.minValue,
        this.maxValue,
        this.selectStatus ? this.selectStatus.status : '',
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
    this.minValue = 0;
    this.maxValue = 5000;
    this.selectStatus = undefined;
    this.page = 1;
    this.paramURL = { page: 1, size: this.tableSize };
    this.addParam();
    this.getProduct();
  }
}
