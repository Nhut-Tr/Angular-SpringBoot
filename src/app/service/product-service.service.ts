import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ProductClass } from '../class/product-class.model';

@Injectable({
  providedIn: 'root',
})
export class ProductServiceService {
  baseUrl = 'http://localhost:8080/controller';
  constructor(private http: HttpClient) {}
  getList(page: number, size: number): Observable<ProductClass[]> {
    return this.http.get<ProductClass[]>(
      `${this.baseUrl + '/product-list'}?page=${page}&size=${size}`
    );
  }
  getListForAdmin(page: number, size: number): Observable<ProductClass[]> {
    return this.http.get<ProductClass[]>(
      `${this.baseUrl + '/admin/product-list'}?page=${page}&size=${size}`
    );
  }
  getListDeactivated(page: number, size: number): Observable<ProductClass[]> {
    return this.http.get<ProductClass[]>(
      `${this.baseUrl + '/product-list-deactivated'}?page=${page}&size=${size}`
    );
  }
  getProductById(id: any): Observable<ProductClass> {
    return this.http.get(`${this.baseUrl + '/product'}/${id}`);
  }

  findByName(name: any): Observable<ProductClass[]> {
    return this.http.get<ProductClass[]>(`${this.baseUrl}?id=${name}`);
  }

  public addProduct(product: ProductClass): Observable<Object> {
    return this.http.post(`${this.baseUrl + '/product'}`, product);
  }
  deleteAll(): Observable<any> {
    return this.http.delete(this.baseUrl + '/product');
  }
  create(data: any): Observable<any> {
    return this.http.post(this.baseUrl + '/product', data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl + '/product'}/${id}`, data);
  }

  // delete(id: any): Observable<any> {
  //   return this.http.put(`${this.baseUrl}/${id}`);
  // }
  setStatusProduct(id: any, status: boolean): Observable<any> {
    return this.http.put(`${this.baseUrl + '/product-status'}/${id}`, status);
  }
  findProductByName(
    name: any,
    page: number,
    size: number
  ): Observable<ProductClass[]> {
    return this.http.get<ProductClass[]>(
      `${
        this.baseUrl + '/search-product-name'
      }?name=${name}&page=${page}&size=${size}`
    );
  }

  findProductByNameAdmin(
    name: any,
    page: number,
    size: number
  ): Observable<ProductClass[]> {
    return this.http.get<ProductClass[]>(
      `${
        this.baseUrl + '/search-product-name-admin'
      }?name=${name}&page=${page}&size=${size}`
    );
  }

  findProductAllField(
    name: any,
    minPrice: any,
    maxPrice: any,
    status: any,
    page: number,
    size: number
  ): Observable<ProductClass[]> {
    return this.http.get<ProductClass[]>(
      `${
        this.baseUrl + '/search-all-product'
      }?name=${name}&minPrice=${minPrice}&maxPrice=${maxPrice}&status=${status}&page=${page}&size=${size}`
    );
  }

  exportExcel(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/export/excel`, {
      responseType: 'blob',
    });
  }
}
