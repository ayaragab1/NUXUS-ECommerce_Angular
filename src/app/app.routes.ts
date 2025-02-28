import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { authGuard } from './core/guards/auth.guard';
import { loggedinGuard } from './core/guards/loggedin.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [loggedinGuard],
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
      {
        path: 'forget',
        loadComponent: () =>
          import('./pages/forgetpassword/forgetpassword.component').then((c) => c.ForgetpasswordComponent),
        title: 'Foget Password',
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
        canActivate:[authGuard]
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
        path: 'product-details/:id',
        loadComponent: () =>
          import('./pages/product-details/product-details.component').then((c) => c.ProductDetailsComponent),
        title: 'Products',
        data: {renderMode : 'dynamic'}
      
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./pages/categories/categories.component').then((c) => c.CategoriesComponent),
        title: 'Categories',
      },
      {
        path: 'checkout/:id',
        loadComponent: () =>
          import('./pages/checkout/checkout.component').then((c) => c.CheckoutComponent),
        title: 'Checkout',
        canActivate:[authGuard],
        data: {renderMode : 'dynamic'}
      },
      {
        path: 'wishlist',
        loadComponent: () =>
          import('./pages/wishlist/wishlist.component').then((c) => c.WishlistComponent),
        title: 'Wishlist',
        canActivate:[authGuard]
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./pages/allorders/allorders.component').then((c) => c.AllordersComponent),
        title: 'Orders',
        canActivate:[authGuard]
      },
    ],
  },

  { path: '**', component: NotFoundComponent, title: 'Not Found' },
];
