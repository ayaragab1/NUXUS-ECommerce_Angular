import { Component, Inject, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { error } from 'console';
import { Notyf } from 'notyf';
import { NOTYF } from '../../shared/utilities/notyf.token';

@Component({
  selector: 'app-forgetpassword',
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss',
})
export class ForgetpasswordComponent {
  constructor(@Inject(NOTYF) private notyf: Notyf) {}

  authservice = inject(AuthService);
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  isLoading: boolean = false;
  step: number = 1;

  verifyEmail: FormGroup = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
  });

  verifyCode: FormGroup = this.formBuilder.group({
    resetCode: [null, [Validators.required, Validators.pattern(/^[0-9]{5,}$/)]],
  });

  resetPassword: FormGroup = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    newPassword: [
      null,
      [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/)],
    ],
  });

  onSubmitVerifyEmail(): void {

    let emailValue = this.verifyEmail.get('email')?.value; 
    this.resetPassword.get('email')?.patchValue(emailValue);
     
    if (this.verifyEmail.valid) {
      this.isLoading = true;
      this.authservice.verifyEmail(this.verifyEmail.value).subscribe({
        next: (res) => {
          if (res.statusMsg == 'success') {
            this.step++;
          }
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
          this.notyf.error(err.error.message);
          },
      });
    }
  }
  onSubmitResetCode(): void {
    if (this.verifyCode.valid) {
      this.isLoading = true;
      this.authservice.verifyCode(this.verifyCode.value).subscribe({
        next: (res) => {
          if (res.status == 'Success') {
            this.step++;
          }
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
          this.notyf.error(err.error.message);
        },
      });
    }
  }

  onSubmitResetPassword(): void {
    if (this.resetPassword.valid) {
      this.isLoading = true;
      this.authservice.forgetPassword(this.resetPassword.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          
            localStorage.setItem('userToken', res.token);
            this.notyf.success('Password Changed Successfully');
            this.authservice.saveUserData();
            setInterval(()=>{
              this.router.navigate(['/home']);
            }, 2000)
        },
        error: (err) => {
          this.isLoading = false;
          this.notyf.error(err.error.message);
        },
      });
    }
  }
}
