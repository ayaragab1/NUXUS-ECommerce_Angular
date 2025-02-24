import { isPlatformBrowser, UpperCasePipe } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  input,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { CartService } from '../../core/services/carts/cart.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/Translation/my-translate.service';
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
  private readonly renderer = inject(Renderer2);
  Id = inject(PLATFORM_ID);
  isLoggedIn: boolean = false;
  cartCount: number = 0;
  @ViewChild('dropdownNotification') dropdownNotification!: ElementRef;

  ngOnInit(): void {
    this.isUserLoggedIn();
    this.getCartCount();
  }

  getCartCount(): void {
   this.cartService.cartItemsNumber.subscribe({
      next: (res) => {
        this.cartCount = res;
      },
    });
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
