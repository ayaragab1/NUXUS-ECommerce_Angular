import { isPlatformBrowser, UpperCasePipe } from '@angular/common';
import {
  Component,
  computed,
  ElementRef,
  inject,
  input,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  Signal,
  ViewChild,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { CartService } from '../../core/services/carts/cart.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/Translation/my-translate.service';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);
  private readonly myTranslateService = inject(MyTranslateService);
  private readonly translateService = inject(TranslateService);
  private readonly wishlistService = inject(WishlistService);
  private readonly renderer = inject(Renderer2);
  Id = inject(PLATFORM_ID);
  isLoggedIn: boolean = false;
  cartCount = computed(() => this.cartService.cartItemsNumber());
  wishCount = computed(() => this.wishlistService.wishlistCount());
  @ViewChild('dropdownNotification') dropdownNotification!: ElementRef;

  ngOnInit(): void {
    this.isUserLoggedIn();
    this.getCartCount();
    this.getWishlistCount();
  }

  getCartCount(): void {
    if(isPlatformBrowser(this.Id)){
      if(localStorage.getItem("userToken")){
        this.cartService.getCartData().subscribe({
          next: (res) => {
            this.cartService.cartItemsNumber.set(res.numOfCartItems);
          },
        });
      }
    }
  }

  getWishlistCount(): void {
    if(isPlatformBrowser(this.Id)){
      if(localStorage.getItem("userToken")){
        this.wishlistService.getWishlistData().subscribe({
          next: (res) => {
            this.wishlistService.wishlistCount.set(res.count);
          },
        });
      }
    }
  }
  isUserLoggedIn() {
    if (isPlatformBrowser(this.Id)) {
      localStorage.getItem('userToken')
        ? (this.isLoggedIn = true)
        : (this.isLoggedIn = false);
    }
  }

  logout(): void {
    this.authService.logoutUser();
  }

  changeLang(lang: string) {
    this.myTranslateService.changeLang(lang);
  }

  currentLang(lang: string) {
    return this.translateService.currentLang == lang;
  }
  // Method to hide the dropdown
  hideDropdown(): void {
    const dropdown = this.dropdownNotification.nativeElement;
    this.renderer.addClass(dropdown, 'hidden'); // Use Renderer2 to safely add the 'hidden' class
  }
}
