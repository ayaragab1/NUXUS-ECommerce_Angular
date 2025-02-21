import { Component, Inject, inject, OnInit } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckoutService } from '../../core/services/checkout/checkout.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  private toastr = inject(ToastrService); 
  private readonly formBuilder = inject(FormBuilder);
  private readonly checkoutService = inject(CheckoutService);
  private readonly router = inject(ActivatedRoute);
  private readonly route = inject(Router);

  isLoading: boolean = false;
  cartId: string | null = null;
  checkOutForm!: FormGroup;
  ngOnInit(): void {
    this.initalizeForm();
    this.getCartId();
  }
  getCartId() {
    this.router.paramMap.subscribe({
      next: (res) => {
        this.cartId = res.get('id');
      },
    });
  }
  initalizeForm() {
    this.checkOutForm = this.formBuilder.group({
      details: [null, [Validators.required]],
      phone: [
        null,
        [Validators.required, Validators.pattern(/^01[012][0-9]{8}$/)],
      ],
      city: [null, [Validators.required]],
    });
  }
  onSubmitCheckOutForm(type: string) {
    
    if (this.checkOutForm.valid) {
      this.isLoading = true;

      if (type == 'visa') {
        this.checkoutService
          .checkoutPayment(this.cartId!, this.checkOutForm.value)
          .subscribe({
            next: (res) => {
              if (res.status == 'success') {
                open(res.session.url, '_self');
              }
              this.isLoading = false;
            },
            error: (err) => {
              console.log(err);
              this.isLoading = false;
            },
          });
      } else {
        this.checkoutService
          .checkoutPaymentCash(this.cartId!, this.checkOutForm.value)
          .subscribe({
            next: (res) => {
              if (res.status == 'success') {
                this.toastr.success('Done', 'Order Placed Successfully!');
                this.route.navigate(['/allorders']);
              }
              this.isLoading = false;

            },
            error: (err) => {
              console.log(err);
              this.isLoading = false;

            },
          });
      }
    } else {
      this.checkOutForm.markAllAsTouched();
    }
  }
}
