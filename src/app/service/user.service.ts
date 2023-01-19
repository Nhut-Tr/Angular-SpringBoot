import { Users } from './../class/users';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseURL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getPublicContent(): Observable<any> {
    return this.http.get(baseURL + 'all', { responseType: 'text' });
  }

  getUserPage(): Observable<any> {
    return this.http.get(baseURL + 'user', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(baseURL + 'admin', { responseType: 'text' });
  }

  getListUser(page: number, size: number): Observable<Users[]> {
    return this.http.get<Users[]>(
      `${baseURL + 'users'}?page=${page}&size=${size}`
    );
  }

  getUserById(id: any): Observable<Users> {
    return this.http.get(`${baseURL + 'user'}/${id}`);
  }

  findByUserName(
    userName: any,
    page: number,
    size: number
  ): Observable<Users[]> {
    return this.http.get<Users[]>(
      `${
        baseURL + 'search-user-name'
      }?userName=${userName}&page=${page}&size=${size}`
    );
  }
  findUserByEmail(email: any, page: number, size: number): Observable<Users[]> {
    return this.http.get<Users[]>(
      `${baseURL + 'search-email'}?email=${email}&page=${page}&size=${size}`
    );
  }

  findUserByRole(id: any, page: number, size: number): Observable<Users[]> {
    return this.http.get<Users[]>(
      `${baseURL + 'search-role'}?id=${id}&page=${page}&size=${size}`
    );
  }

  findUserByStatus(
    status: any,
    page: number,
    size: number
  ): Observable<Users[]> {
    return this.http.get<Users[]>(
      `${
        baseURL + 'find-user-by-status'
      }?enabled=${status}&page=${page}&size=${size}`
    );
  }
  findUserAllField(
    userName: any,
    email: any,
    roleId: any,
    status: any,
    page: number,
    size: number
  ): Observable<Users[]> {
    return this.http.get<Users[]>(
      `${
        baseURL + 'search-all'
      }?userName=${userName}&email=${email}&roleId=${roleId}&enabled=${status}&page=${page}&size=${size}`
    );
  }

  public addUser(user: Users): Observable<Object> {
    return this.http.post(`${baseURL + 'register'}`, user);
  }
  deleteAll(): Observable<any> {
    return this.http.delete(baseURL + 'user');
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseURL + 'admin/update-user'}/${id}`, data);
  }
  addUsers(user: Users): Observable<Object> {
    return this.http.post(`${baseURL + 'admin/add-user'}`, user);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseURL + 'user'}/${id}`);
  }
  updateProfile(formData: FormData): Observable<any> {
    return this.http.put(`${baseURL + 'update-user'}`, formData);
  }
  setStatusUser(id: any, enable: boolean): Observable<any> {
    return this.http.put(`${baseURL + 'user-status'}/${id}`, enable);
  }

  getListUsersDeactivated(): Observable<Users[]> {
    return this.http.get<Users[]>(`${baseURL + 'user-list-deactivated'}`);
  }

  getListUsersActivated(): Observable<Users[]> {
    return this.http.get<Users[]>(`${baseURL + 'user-list-activated'}`);
  }
}
