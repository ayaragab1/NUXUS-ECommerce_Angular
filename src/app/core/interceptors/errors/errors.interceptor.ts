import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { error } from 'console';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {

  const toastService = inject(ToastrService)
  return next(req).pipe( catchError((err)=>{
    
    toastService.error('Nuxus' , err.error.message)
    return throwError(()=>err);
  }));
};
