import { Router } from '@angular/router';
import { ProductClass } from 'src/app/class/product-class.model';
import { ProductServiceService } from 'src/app/service/product-service.service';
import { Component, OnInit } from '@angular/core';
import { NgConfirmService } from 'ng-confirm-box';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products?: any;
    currentProducts?: ProductClass;
    currentIndex = -1;
    name = '';
    page: number = 1;
    count: number = 0;
    tableSize: number = 5;
    searchName:any;
  constructor(private productService:ProductServiceService,private router:Router,private confirmService:NgConfirmService) { }

  ngOnInit(): void {
    this.getProduct();
  }
  getProduct(): void {
    this.productService.getList()
      .subscribe(
        data => {
          this.products = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getProduct();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getProduct();
  }
  refreshList(): void {
    this. getProduct();
    this.currentProducts = undefined;
    this.currentIndex = -1;
  }

  setActiveProduct(products: ProductClass, index: number): void {
    this.currentProducts = products;
    this.currentIndex = index;
  }

  removeAllTutorials(): void {
    this.productService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  search(){
    this.productService.findProductByName(this.searchName).subscribe(data=>{
      this.products = data;
    })
  }

  updateProduct(id:number){
    this.router.navigate(['/admin/update-product',id]);
  }

  deleteProduct(id:number){
    this.confirmService.showConfirm('Are you want to delete?',
    ()=>{
      this.productService.delete(id).subscribe(data =>{
        console.log(data);
        this.refreshList();
      })
    },
    ()=>{
    }
    )
  }
}
