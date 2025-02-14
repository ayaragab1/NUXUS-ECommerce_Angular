import { Component, Inject, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { Notyf } from 'notyf';
import { NOTYF } from '../../shared/utilities/notyf.token';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(@Inject(NOTYF) private notyf: Notyf) {}

  isLoading: boolean = false;

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z]\w{7,}$/),
      ]),
      rePassword: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    { validators: [this.confirmPassword] }
  );

  confirmPassword(group: AbstractControl) {
    return group.get('password')?.value === group.get('rePassword')?.value
      ? null
      : { missMatch: true };
  }

  onSubmitRegisterForm(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.authService.registerUser(this.registerForm.value).subscribe({
        next: (res) => {
          if (res.message == 'success') {
            this.notyf.success('Account created successfully🎉,Please Login ');
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 1000);
          }

          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
          this.notyf.error(error.error.message);
        },
      });
    } else {
      this.registerForm?.setErrors({ misMatch: true });
      this.registerForm.markAllAsTouched();
    }
  }
}
