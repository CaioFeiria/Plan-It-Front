import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
      providePrimeNG({
          theme: {
              preset: Aura,
              options: {
                darkModeSelector: '.my-app-dark',
                ripple: true, // animação para botões
                zIndex: {
                  modal: 1100,    // dialog, sidebar
                  overlay: 1000,  // dropdown, overlaypanel
                  menu: 1000,     // overlay menus
                  tooltip: 1100   // tooltip
                },
              },
          }
      }),
  ]
};
