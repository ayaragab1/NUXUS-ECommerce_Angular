import { Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { CartService } from '../../core/services/carts/cart.service';
import { Notyf } from 'notyf';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  imports: [CurrencyPipe, RouterLink ,TranslatePipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent implements OnInit {

  private readonly wishlistService = inject(WishlistService);
  private readonly toastrService = inject(ToastrService);
  wishlistData: IProduct[] = [];
  cartService = inject(CartService);
  ngOnInit(): void {
    this.getWishlistData();
  }

  getWishlistData(): void {
    this.wishlistService.getWishlistData().subscribe({
      next: (res) => {
        this.wishlistData = res.data;
      },
    });
  }

  addToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        this.toastrService.success(res.message);
        this.cartService.cartItemsNumber.set(res.numOfCartItems);
      },
    });
  }

  deleteFromWishlist(id: string): void {
    this.wishlistService.removeFormWishlist(id).subscribe({
      next: (res) => {
        this.getWishlistData()
        this.toastrService.success(res.message);
        this.wishlistService.wishlistCount.set(res.data.length)
      },
    });
  }
}
