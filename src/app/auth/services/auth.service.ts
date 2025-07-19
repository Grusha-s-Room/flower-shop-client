import { HttpClient } from "@angular/common/http";
import { User } from "../interfaces/user.interface";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/app/environments/environment";

const _baseurl = environment._baseurl;

@Injectable({ providedIn: 'root'})
export class AuthService {
  private http = inject( HttpClient );
  signUp ( user : User ) : Observable<any> {
    console.log( user );
    return this.http.post(`${_baseurl}/flower-shop/sign-up`, user);
  }
  
}