import { Observable } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { ProductClass } from 'src/app/product-class.model';
import { ProductServiceService } from 'src/app/product-service.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  products?:ProductClass[];
  dataProduct?: ProductClass[];
  currentProduct: ProductClass = {};
  currentIndex = -1;
  title='';
  constructor(private productService: ProductServiceService) { }

  ngOnInit(): void {
  this.retrieveProduct();
  }
  retrieveProduct(): void{
    this.productService.getList().subscribe(data=> {
      console.log(data);
      this.products = data;
    });
    
  }
  // refreshList(): void {
  //   this.retrieveProduct();
  //   this.currentProduct = {};
  //   this.currentIndex = -1;
  // }


}
