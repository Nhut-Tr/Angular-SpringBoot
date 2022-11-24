import { HttpServiceService } from './http-service.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Checkout } from '../class/checkout';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http: HttpClient, private router: Router,private httpService:HttpServiceService) { }
  baseUrl = "http://localhost:8080/order";

  checkout(request: {
    userId: any, totalPrice: any, deliveryAddress: any, quantity: any
  }): Observable<any> {
    return this.http.post(this.baseUrl + '/check-out', request);
  }

  public getHistoryByUserId(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/get-history-by-user-id?userId=${id}`);
  }

  getBestSale(): Observable<Checkout[]> {
    return this.http.get<Checkout[]>(`${this.baseUrl+'/get-best-sale'}`); 
  }


}
