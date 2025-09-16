import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router); // Correct way to inject Router in Angular 19

  // Get the token from localStorage (or any other storage mechanism)
  const authToken = localStorage.getItem('token');

  // Clone the request and attach the Authorization header if a token exists
  const clonedRequest = authToken
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      })
    : req;

  return next(clonedRequest).pipe(
    tap({
      error: (error) => {
        if (error.status === 401 || error.status === 403) {
          // Redirect to login on unauthorized or forbidden responses
          router.navigate(['/login']);
        }
      },
    })
  ) as Observable<any>; // Ensure proper type handling
};
