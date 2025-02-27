import { Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { Router, RouterLink } from '@angular/router';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { CartService } from '../../core/services/carts/cart.service';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import Notyf from 'notyf/notyf';
import { TranslatePipe } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  imports: [RouterLink, CurrencyPipe , TranslatePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {

  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastrService = inject(ToastrService);
  private readonly route = inject(Router);
  products: IProduct[] = [];
  private readonly iD = inject(PLATFORM_ID);

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productsService.getProducts().subscribe({
      next: (res) => {
        this.products = res.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  addToCart(id: string): void {
    if (isPlatformBrowser(this.iD)) {
      if (localStorage.getItem('userToken') == null) {
        this.toastrService.error('Please Login To add Product To Your Cart');
        this.route.navigate(['/login']);
      } else {
        this.cartService.addProductToCart(id).subscribe({
          next: (res) => {
            this.toastrService.success(res.message);

            this.cartService.cartItemsNumber.set(res.numOfCartItems);
          },
          error: (err) => {
            console.log(err);

            // this.notyf.error(err)
          },
        });
      }
    }
  }

  addToWishlist(prodId: string): void {
    this.wishlistService.addToWishlist(prodId).subscribe({
      next: (res) => {
        this.toastrService.success(res.message);
        this.wishlistService.wishlistCount.set(res.data.length)
      },
    });
  }

  getStars(rating: number): number[] {
    return Array.from({ length: 5 }, (_, i) =>
      i < Math.floor(rating) ? 1 : i < rating ? 0.5 : 0
    );
  }
}
