import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../shared/interfaces/iproduct';
import { ProductsService } from '../../core/services/products/products.service';
import { CarouselComponent, CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [CarouselModule , CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  activeRoute = inject(ActivatedRoute);
  productsService = inject(ProductsService);
  productDetails: IProduct = {} as IProduct;
  largeImage: string = '';
  @ViewChild('largeCarousel') largeCarousel: CarouselComponent = {} as CarouselComponent;
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
    var nums= Array.from({ length: 5 }, (_, i) =>
      i < Math.floor(rating) ? 1 : i < rating ? 0.5 : 0
    );
    return nums;
  }

}
