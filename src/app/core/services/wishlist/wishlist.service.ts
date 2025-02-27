import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor(private httpClient: HttpClient) {}

  wishlistCount: WritableSignal<number> = signal(0);

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
