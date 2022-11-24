import { Router } from '@angular/router';
import { ProductServiceService } from 'src/app/service/product-service.service';
import { ProductClass } from 'src/app/class/product-class.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-crud-product',
  templateUrl: './crud-product.component.html',
  styleUrls: ['./crud-product.component.css']
})
export class CrudProductComponent implements OnInit {

  product:ProductClass = new ProductClass;
  constructor(private productService:ProductServiceService ,private router:Router) {}

  ngOnInit(): void {
  }

  addProduct(){
    console.log(this.product);
    this.productService.addProduct(this.product).subscribe(data =>{
      console.log(data);
      this.gotoProductList();
    },
    error =>console.log(error));
  }

  onSubmit(){
      this.addProduct();
  }

  gotoProductList(){
    this.router.navigate(['/admin/product-list']);
  }
  readUrl(event:any) {
    if (event.target.files ) {
      const file = event.target.files[0];
      var reader = new FileReader();
  
      reader.onload = (event: ProgressEvent) => {
        // this.url = (<FileReader>event.target).result;
      }
  
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
