import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  registerUser(data: object) : Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/auth/signup`, data);
  }

  loginUser(data: object) : Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/auth/signin`, data);
  }
}
