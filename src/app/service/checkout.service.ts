import { Order } from './../class/order';
import { HttpServiceService } from './http-service.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Checkout } from '../class/checkout';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private httpService: HttpServiceService
  ) {}
  baseUrl = 'http://localhost:8080/order';

  checkout(request: {
    userId: any;
    totalPrice: number;
    deliveryAddress: string;
    quantity: any;
    phoneNumber: string;
    description: string;
  }): Observable<any> {
    return this.http.post(this.baseUrl + '/check-out', request);
  }

  public getHistoryByUserId(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/get-history-by-user-id?userId=${id}`);
  }

  public getHistoryByOrderId(id: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/get-history-by-order-id?orderId=${id}`
    );
  }

  getBestSale(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl + '/get-best-sale'}`);
  }

  getTotalSales(): Observable<Checkout[]> {
    return this.http.get<Checkout[]>(`${this.baseUrl + '/get-total-sales'}`);
  }

  getAllOrder(page: number, size: number): Observable<Order[]> {
    return this.http.get<Order[]>(
      `${this.baseUrl + '/list-checkout'}?page=${page}&size=${size}`
    );
  }

  getTotalForOrder(orderId: any): Observable<any> {
    return this.http.get(`${this.baseUrl + '/list-total'}/${orderId}`);
  }
  getOrderById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl + '/list-order'}/${id}`);
  }
  updateOrder(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl + '/update-order'}/${id}`, data);
  }

  findByCreateAt(
    request: { start: any; finish: any },
    page: number,
    size: number
  ): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/find-by-date?page=${page}&size=${size}`,
      request
    );
  }
  findByStatus(status: number, page: number, size: number): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/find-by-status?page=${page}&size=${size}`,
      status
    );
  }
  findByStatusAndDate(
    request: { start: any; finish: any; status: number },
    page: number,
    size: number
  ): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/find-by-status-and-date?page=${page}&size=${size}`,
      request
    );
  }
}
