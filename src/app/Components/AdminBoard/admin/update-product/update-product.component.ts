import { ActivatedRoute, Router } from '@angular/router';
import { ProductClass } from 'src/app/class/product-class.model';
import { ProductServiceService } from 'src/app/service/product-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  id:any;
  product:ProductClass = new ProductClass();
  constructor(private productService:ProductServiceService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.productService.getProductById(this.id).subscribe(data =>{
      this.product = data;
    },error => console.log(error));
  }

  updateProduct(){
    this.productService.update(this.id,this.product).subscribe(data =>{
      console.log(data);
      this.product = new ProductClass();
      this.gotoList();
    },error => console.log(error));
  }
  gotoList(){
    this.router.navigate(['/admin/product-list']);
  }
  onSubmit(){
    this.updateProduct();
  }

}
