import { Order } from './../class/order';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpServiceService } from './http-service.service';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  baseUrl = 'http://localhost:8080/order';

  constructor(
    private http: HttpClient,
    private httpService: HttpServiceService
  ) {}

  getDate(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl + '/get-date'}`);
  }
}
