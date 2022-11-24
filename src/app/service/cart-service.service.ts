import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from '../class/cart';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartServiceService {
  public cartServiceItem = new BehaviorSubject<Cart[]>([]);
  baseUrl = 'http://localhost:8080/cart';
  constructor(private http: HttpClient, private router: Router) {}
  public save(cart: Cart): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/add-product`, cart).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  public update(cart: Cart): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/update-quantity-from-cart`, cart)
      .pipe(
        map((resp) => {
          return resp;
        })
      );
  }

  // public delete(cart:any): Observable<any> {
  //   return this.http.post<any>(`${this.baseUrl}/removeProductFromCart`, {cart_id:cart.id,user_id:cart.user_id}).pipe(map((resp) => {
  //     return resp;

  //   }));;
  // }
  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl + '/remove-product-from-cart'}/${id}`);
  }

  public getAll(): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.baseUrl}/cart-list`);
  }

  public getCartByUserId(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/get-cart-by-user-id?userId=${id}`);
  }
}
