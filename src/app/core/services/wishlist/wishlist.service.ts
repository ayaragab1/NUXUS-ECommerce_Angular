import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor(private httpClient: HttpClient) {}

  getWishlistData(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/wishlist`);
  }

  addToWishlist(prodId: string): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/wishlist`, {
      productId: prodId,
    });
  }

  removeFormWishlist(prodId: string): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/wishlist/${prodId}`);
  }
}
