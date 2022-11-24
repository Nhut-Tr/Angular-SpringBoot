import { TokenStorageService } from './token-storage.service';
import { Injectable } from '@angular/core';
import { HttpClient ,HttpErrorResponse} from '@angular/common/http';
import { throwError } from 'rxjs'
import { HttpHeaders } from '@angular/common/http';
import { map, filter, scan,catchError,tap } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class HttpServiceService {
  baseUrl = "http://localhost:8080/order/check-out";

  constructor(private http: HttpClient,private tokenStorage:TokenStorageService) { }


  postRequestWithToken(url:string,param:{}){
    const httpOptionsWithToken = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':'Bearer '+this.tokenStorage.getToken()
      })
    }; 

    return this.http.post(this.baseUrl,httpOptionsWithToken)
   
  }

    setLoginData(data:any){
      localStorage.setItem("login_data",JSON.stringify(data.user_profile_details));
    }
   

   
    getLoginToken(){
        return localStorage.getItem("token")
    }
    
  }