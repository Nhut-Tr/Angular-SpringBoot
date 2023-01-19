import { Component, OnInit } from '@angular/core';
import { ProductClass } from 'src/app/class/product-class.model';
import { ProductServiceService } from 'src/app/service/product-service.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  products?: ProductClass[];
  dataProduct?: ProductClass[];
  currentProduct: ProductClass = {};
  currentIndex = -1;
  title = '';
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  constructor(
    private productService: ProductServiceService,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.retrieveProduct();
  }
  retrieveProduct(): void {
    this.productService.getList(0, 6).subscribe((data: any) => {
      this.products = data.content;
      console.log(data);
    });
  }
}
