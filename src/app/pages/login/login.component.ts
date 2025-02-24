import { Component, Inject, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { Notyf } from 'notyf';
import { NOTYF } from '../../shared/utilities/notyf.token';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [RouterLink ,  ReactiveFormsModule, TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(@Inject(NOTYF) private notyf: Notyf) {}

  isLoading: boolean = false;

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z]\w{7,}$/),
    ]),
  });

  onSubmitLoginForm():void {
    
    if(this.loginForm.valid){
      this.isLoading = true;
      this.authService.loginUser(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.message == 'success') {
            this.notyf.success('LoggedIn Successfully🎉');

            setTimeout(() => {
              //1-save token in local storage
              localStorage.setItem('userToken', res.token);
                  
              //2-decode token
              this.authService.saveUserData();

              //3-redirect to home page
              this.router.navigate(['/home']);
            }, 1000);
          }
  
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
          this.notyf.error(error.error.message);
        },
      });
    }else{
     this.loginForm.markAllAsTouched();
    }

  }
}
