import { Component, Inject, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { Notyf } from 'notyf';
import { TranslatePipe } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgetpassword',
  imports: [ReactiveFormsModule , TranslatePipe],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss',
})
export class ForgetpasswordComponent {

  private readonly authservice = inject(AuthService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly toastrService = inject(ToastrService);
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
          this.toastrService.error(err.error.message);
          },
      });
    }else{
      this.verifyEmail.markAllAsTouched();
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
          this.toastrService.error(err.error.message);
        },
      });
    }else{
      this.verifyCode.markAllAsTouched();

    }
  }

  onSubmitResetPassword(): void {
    if (this.resetPassword.valid) {
      this.isLoading = true;
      this.authservice.forgetPassword(this.resetPassword.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          
            localStorage.setItem('userToken', res.token);
            this.toastrService.success('Password Changed Successfully');
            this.authservice.saveUserData();
            setInterval(()=>{
              this.router.navigate(['/home']);
            }, 2000)
        },
        error: (err) => {
          this.isLoading = false;
          this.toastrService.error(err.error.message);
        },
      });
    }
    else{
      this.resetPassword.markAllAsTouched();
    }
  }
  
}
