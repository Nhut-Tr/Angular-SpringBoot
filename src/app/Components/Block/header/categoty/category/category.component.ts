import { Component, OnInit } from '@angular/core';
import { ProductClass } from 'src/app/product-class.model';
import { ProductServiceService } from 'src/app/product-service.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
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
}
