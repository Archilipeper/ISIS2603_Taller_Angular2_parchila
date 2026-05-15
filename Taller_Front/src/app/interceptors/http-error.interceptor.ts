import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';

/*
 * Implementar: HU-04 — Interceptor de Errores HTTP
 */

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {

  const toastr = inject(ToastrService);
  return next(req).pipe(
  catchError((error: HttpErrorResponse) => {
       if (req.url.includes('weatherapi.com')) {
        toastr.error('Error al conectar con WeatherAPI. Intente más tarde.');
       } else {
         toastr.error(`Error ${error.status}: ${error.message}`);
       }
       return throwError(() => error);
     })
   );
 };

