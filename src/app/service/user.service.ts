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

  getListUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(`${baseURL + 'users'}`);
  }

  getUserById(id: any): Observable<Users> {
    return this.http.get(`${baseURL + 'user'}/${id}`);
  }

  findByUserName(username: any): Observable<Users[]> {
    return this.http.get<Users[]>(
      `${baseURL + 'search-user-name'}?userName=${username}`
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

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseURL + 'user'}/${id}`);
  }
  updateProfile(id: any, username: string, fullName: string): Observable<any> {
    return this.http.put(`${baseURL + 'update-user'}/${id}`, {
      username,
      fullName,
    });
  }
}
