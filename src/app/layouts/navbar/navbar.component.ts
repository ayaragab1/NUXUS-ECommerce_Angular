import { isPlatformBrowser, UpperCasePipe } from '@angular/common';
import { Component, inject, input, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  authService = inject(AuthService);
  isLoggedIn: boolean = false;
  Id= inject(PLATFORM_ID); 

  ngOnInit(): void {
    this.isUserLoggedIn();
  }

  isUserLoggedIn() {
    if(isPlatformBrowser(this.Id)){
      localStorage.getItem('userToken')
      ? (this.isLoggedIn = true)
      : (this.isLoggedIn = false);
    }
   
  }

  logout(): void {
    this.authService.logoutUser();
  }
}
