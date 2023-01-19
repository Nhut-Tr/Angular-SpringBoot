import { Observable } from 'rxjs';
import { Users } from 'src/app/class/users';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImgServiceService {
  baseUrl = 'http://localhost:8080/apo/v1/FileUpload';
  constructor(private http: HttpClient) {}

  findImageByFileName(fileName: any): Observable<any> {
    return this.http.post(this.baseUrl, fileName);
  }
}
