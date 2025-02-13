import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { CategoryService } from '../../core/services/categories/category.service';
import { Icategory } from '../../shared/interfaces/icategory';
import { Swiper } from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
@Component({
  selector: 'app-home',
  imports: [CurrencyPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  //Function Injection For Services
  private readonly productsService = inject(ProductsService);
  private readonly categoryService = inject(CategoryService);
  private readonly iD = inject(PLATFORM_ID);
  //Arrays to hold data back from api
  products: IProduct[] = [];
  categories: Icategory[] = [];

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

}
