import { Component, OnInit } from '@angular/core';import { TokenStorageService } from 'src/app/service/token-storage.service';
import { Checkout } from './../../../class/checkout';
import { CheckoutService } from './../../../service/checkout.service';
import { CartServiceService } from './../../../service/cart-service.service';
import { Router } from '@angular/router';
import { ProductClass } from 'src/app/class/product-class.model';
@Component({
  selector: 'app-history-cart',
  templateUrl: './history-cart.component.html',
  styleUrls: ['./history-cart.component.css']
})
export class HistoryCartComponent implements OnInit {
  checkout?:Checkout[];
  products?: ProductClass[];
  constructor(private router : Router,private cartService:CartServiceService,private checkoutService:CheckoutService,private tokenService:TokenStorageService) { }

  ngOnInit(): void {
    
   
      this.cartService.cartServiceItem.subscribe(data=>{
        this.getHistory();
        
      })
    
  }


  getHistory(){
    const id = this.tokenService.getUser().id;
    this.checkoutService.getHistoryByUserId(id).subscribe(data=>{
      this.checkout = data;
      console.log(data);
    })
    
  }
 

}
