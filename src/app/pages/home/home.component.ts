import { Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { CategoryService } from '../../core/services/categories/category.service';
import { Icategory } from '../../shared/interfaces/icategory';
import { Swiper } from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/carts/cart.service';
import { TranslatePipe } from '@ngx-translate/core';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  imports: [CurrencyPipe, RouterLink, TranslatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {

  //Function Injection For Services
  private readonly productsService = inject(ProductsService);
  private readonly categoryService = inject(CategoryService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastService = inject(ToastrService);
  private readonly route = inject(Router);

  private readonly iD = inject(PLATFORM_ID);
  //Arrays to hold data back from api
  products: IProduct[] = [];
  categories: Icategory[] = [];
  isLoading: boolean = false;

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();

    if (isPlatformBrowser(this.iD)) {
      //swiper
      this.initSwiper();
    }
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

  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  getStars(rating: number): number[] {
    return Array.from({ length: 5 }, (_, i) =>
      i < Math.floor(rating) ? 1 : i < rating ? 0.5 : 0
    );
  }

  initSwiper() {
    const swiper = new Swiper('.swiper', {
      modules: [Navigation, Pagination],
      slidesPerView: 1,
      spaceBetween: 20, // Reduced space between slides
      navigation: {
        nextEl: '.nav-next-collection',
        prevEl: '.nav-prev-collection',
      },
      pagination: {
        el: '.sw-pagination-collection',
        clickable: true,
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 15,
        },
        1024: {
          slidesPerView: 6,
          spaceBetween: 10,
        },
        1200: {
          slidesPerView: 6,
          spaceBetween: 10,
        },
      },
    });
  }

  //Cart logic
  addToCart(id: string): void {
    if (isPlatformBrowser(this.iD)) {
      if (localStorage.getItem('userToken') == null) {
        this.toastService.error('Please Login To add Product To Your Cart');
        this.route.navigate(['/login']);
      } else {
        this.isLoading = true;

        this.cartService.addProductToCart(id).subscribe({
          next: (res) => {
            this.isLoading = false;

            this.toastService.success(res.message);

            this.cartService.cartItemsNumber.set(res.numOfCartItems);
          },
          error: (err) => {
            this.isLoading = false;

            console.log(err);
          },
        });
      }
    }
  }

  addToWishlist(prodId: string): void {
    this.wishlistService.addToWishlist(prodId).subscribe({
      next: (res) => {
        this.toastService.success(res.message);
        this.wishlistService.wishlistCount.set(res.data.length)
      }
    });
  }
}
