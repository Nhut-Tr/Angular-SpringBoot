
import { DatePipe } from '@angular/common';
import { CartServiceService } from './../../../../service/cart-service.service';
import { Observable, Subscription, filter } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { ProductClass } from 'src/app/class/product-class.model';
import { ProductServiceService } from 'src/app/service/product-service.service';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { Cart } from 'src/app/class/cart';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  products :any;
  price ?: number;
  cart ?: Cart;
  cartlist : Cart[]=[];
  userId ?: number;
  dateTime ?: Date;
  page: number = 1;
  count: number = 0;
  tableSize: number = 6;
  searchName:any;


  constructor(private productService: ProductServiceService, private cartService:CartServiceService,private userService: UserService,
    private router: Router,private toast : NgToastService,private tokenStorage:TokenStorageService) { }

  ngOnInit(): void {
    this.retrieveProduct();

  }
  retrieveProduct(): void{
    this.productService.getList().subscribe(data=> {
      console.log(data);
      this.products = data;
    });

  }
  search(){
    this.productService.findProductByName(this.searchName).subscribe(data=>{
      this.products = data;
    })
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.retrieveProduct();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.retrieveProduct();
  }

  updateCart(id: number) {
    const pipe = new DatePipe('en-US'); // Use your own locale
    const now = Date.now();
    const myFormattedDate = pipe.transform(now, 'short');
    let total = 0;
    this.cartService.getCartByUserId(this.tokenStorage.getUser().id).subscribe(data => {
      this.cartlist = data;
      // for (let cart of this.cartlist) {
      //   if (cart.product_id == id && cart.user_id == this.user_id && !cart.checkout) {

      //     let product=this.products?.find((product:ProductClass)=>product.id===id)
      //     total = cart.quantity =+ 1;
      //     this.cart = {id:cart.id,user_id:this.tokenStorage.getUser().id,quantity:total,product_id :product?.id,price:product?.price};
      //     this.cartService.update(this.cart).subscribe(data => this.router.navigateByUrl('/cartitem'));
      //     break;
      //   }
      // }
      if (total === 0) {
        this.dateTime = new Date;
        let product=this.products?.find((product:ProductClass)=>product.id===id)
        this.cart =  {id:null,
          userId:this.tokenStorage.getUser().id,
          quantity:total,productId :product?.id,
          price:product?.price};
          this.cartService.save(this.cart).subscribe(data => {

          this.router.navigateByUrl('/cartitem')
          this.cartService.getCartByUserId(this.tokenStorage.getUser().id).subscribe({next:datas=>{

            this.cartService.cartServiceItem.next(datas)
            this.toast.success({detail:"Add To Cart Message",summary: "Add product to cart success!",duration:4000})
          }
        })
        },err =>{
          this.toast.warning({detail:"Failed Message",summary: err.error.message,duration:4000})
        });

      }


    });
  }


}
