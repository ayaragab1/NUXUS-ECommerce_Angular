import {
  Component,
  inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../../shared/interfaces/iproduct';
import { ProductsService } from '../../core/services/products/products.service';
import { CarouselComponent, CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/carts/cart.service';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-product-details',
  imports: [CarouselModule, CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  private readonly activeRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastService = inject(ToastrService);
  private readonly route = inject(Router);
  private readonly iD = inject(PLATFORM_ID);

  largeImage: string = '';
  productDetails: IProduct = {} as IProduct;
  @ViewChild('largeCarousel') largeCarousel: CarouselComponent =
    {} as CarouselComponent;
  @ViewChild('thumbnailCarousel') thumbnailCarousel!: CarouselComponent;

  ngOnInit(): void {
    this.getProducrDetails();
  }
  getProducrDetails(): void {
    let pId: string | null;
    this.activeRoute.paramMap.subscribe({
      next: (params) => {
        pId = params.get('id');
      },
    });
    this.productsService.getProductById(pId!).subscribe({
      next: (prod) => {
        console.log(prod.data);

        this.productDetails = prod.data;
        this.largeImage = this.productDetails.imageCover;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  // Carousel options for the large image slider
  largeCarouselOptions: OwlOptions = {
    loop: true,
    margin: 10,
    nav: false,
    dots: false,
    autoWidth: false,
    center: true,
    items: 1,
  };

  // Carousel options for thumbnails
  thumbnailOptions: OwlOptions = {
    loop: false,
    margin: 10,
    nav: false,
    dots: true,
    responsive: {
      0: {
        items: 3,
      },
      600: {
        items: 4,
      },
      1000: {
        items: 4,
      },
    },
  };

  onThumbnailClick(img: string) {
    if (this.largeCarousel) {
      this.largeCarousel.to(img);
    } else {
      console.error('Large carousel is not initialized.');
    }
  }

  // Method to navigate to the previous slide
  prevSlide() {
    this.largeCarousel.prev();
  }

  // Method to navigate to the next slide
  nextSlide() {
    this.largeCarousel.next();
  }

  getStars(rating: number): number[] {
    var nums = Array.from({ length: 5 }, (_, i) =>
      i < Math.floor(rating) ? 1 : i < rating ? 0.5 : 0
    );
    return nums;
  }
  addToCart(id: string): void {
    if (isPlatformBrowser(this.iD)) {
      if (localStorage.getItem('userToken') == null) {
        this.toastService.error('Please Login To add Product To Your Cart');
        this.route.navigate(['/login']);
      } else {
        this.cartService.addProductToCart(id).subscribe({
          next: (res) => {
            this.toastService.success(res.message);

            this.cartService.cartItemsNumber.set(res.numOfCartItems);
          },
          error: (err) => {
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
        this.wishlistService.wishlistCount.set(res.data.length);
      },
    });
  }
}
