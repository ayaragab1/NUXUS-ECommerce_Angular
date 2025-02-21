import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/carts/cart.service';
import { Icart } from '../../shared/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  cartService = inject(CartService);
  cartData: Icart = {} as Icart;

  ngOnInit(): void {
    this.getUserCart();
  }


  getUserCart(): void {
    this.cartService.getCartData().subscribe({
      next: (res) => {
        this.cartData = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteItemFromCart(id: string) {
    this.cartService.deleteItemFromCart(id).subscribe({
      next: (res) => {
        this.cartData = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateCartItemQuantity(id: string, count: number) {
    this.cartService.updateCartItemQuantity(id, count).subscribe({
      next: (res) => {
        this.cartData = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  emptyCartItems() {
    console.log(this.cartData);

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.emptyCartItems().subscribe({
          next: (res) => {
            if (res.message == 'success') {
              this.cartData = {} as Icart;
              Swal.fire('Deleted!', 'Your Cart is Empty.', 'success');
              console.log(this.cartData);
            }
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }
}
