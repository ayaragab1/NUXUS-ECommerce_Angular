import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login.component').then((c) => c.LoginComponent),
        title: 'Login',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/register/register.component').then((c) => c.RegisterComponent),
        title: 'Register',
      },
    ],
  },

  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.component').then((c) => c.HomeComponent),
        title: 'Home',
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./pages/cart/cart.component').then((c) => c.CartComponent),
        title: 'Cart',
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./pages/brands/brands.component').then((c) => c.BrandsComponent),
        title: 'Brands',
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./pages/products/products.component').then((c) => c.ProductsComponent),
        title: 'Products',
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./pages/categories/categories.component').then((c) => c.CategoriesComponent),
        title: 'Categories',
      },
      {
        path: 'checkout',
        loadComponent: () =>
          import('./pages/checkout/checkout.component').then((c) => c.CheckoutComponent),
        title: 'Checkout',
      },
      
    ],
  },

  { path: '**', component: NotFoundComponent, title: 'Not Found' },
];
