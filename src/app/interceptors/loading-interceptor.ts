import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  // Mostrar loading para requisições que não sejam de assets
  if (!req.url.includes('assets/')) {
    loadingService.show();
  }

  return next(req).pipe(
    finalize(() => {
      if (!req.url.includes('assets/')) {
        loadingService.hide();
      }
    })
  );
};