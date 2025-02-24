import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  cartItemsNumber:BehaviorSubject<number> = new BehaviorSubject(0); 

  private readonly httpClient = inject(HttpClient);


  addProductToCart(id: string): Observable<any> {
    return this.httpClient.post( 
      `${environment.baseUrl}/cart`,
      { productId: id }
    );
  }


  getCartData():Observable<any>{
    return this.httpClient.get (`${environment.baseUrl}/cart` )
  }

  deleteItemFromCart(id:string):Observable<any>{
    return this.httpClient.delete (`${environment.baseUrl}/cart/${id}` )
  }

  updateCartItemQuantity(id:string , newCount:number):Observable<any>{
    return this.httpClient.put (`${environment.baseUrl}/cart/${id}` ,{ count : newCount})
  }

  emptyCartItems():Observable<any>{
    return this.httpClient.delete (`${environment.baseUrl}/cart` )
  }
}
