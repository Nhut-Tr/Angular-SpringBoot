import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ProductClass } from './product-class.model';


@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  baseUrl = "http://localhost:8080/product";
  constructor(private http: HttpClient) { }
  getList(): Observable<ProductClass[]> {
    return this.http.get<ProductClass[]>(`${this.baseUrl}`); 
  }

  get(id: any): Observable<ProductClass> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  findByTitle(title: any): Observable<ProductClass[]> {
    return this.http.get<ProductClass[]>(`${this.baseUrl}?title=${title}`);
  }
  
}
