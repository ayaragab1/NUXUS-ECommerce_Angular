import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, ObservableLike } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private readonly httpClient = inject(HttpClient);
  

  checkoutPayment(id: string, data: object): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}/orders/checkout-session/${id}?url=http://localhost:4200`,
      {
        shippingAddress: data,
      }
    );
  }
  checkoutPaymentCash(id: string, data: object): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}/orders/${id}`,
      {
        shippingAddress: data,
      }
    );
  }
}
