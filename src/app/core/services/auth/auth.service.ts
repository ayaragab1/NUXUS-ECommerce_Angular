import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { log } from 'console';
import { UserTokenData } from '../../../shared/interfaces/user-token-data';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: UserTokenData = {} as UserTokenData;
  router = inject(Router);
  constructor(private httpClient: HttpClient) {}

  registerUser(data: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/auth/signup`, data);
  }

  loginUser(data: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/auth/signin`, data);
  }

  logoutUser(): void {
    localStorage.removeItem('userToken');
    this.userData = {} as UserTokenData;
    this.router.navigate(['/login']);
  }

  saveUserData(): void {
    if (localStorage.getItem('userToken') != null) {
      this.userData = jwtDecode(localStorage.getItem('userToken')!);
    }
  }

  verifyEmail(data: object): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}/auth/forgotPasswords`,
      data
    );
  }

  verifyCode(data: object): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}/auth/verifyResetCode`,
      data
    );
  }

  forgetPassword(data: object): Observable<any> {
    return this.httpClient.put(
      `${environment.baseUrl}/auth/resetPassword`,
      data
    );
  }
}
