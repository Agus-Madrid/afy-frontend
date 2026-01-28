import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

import { environment } from '../environments/environment';
import { API_BASE_URL } from './shared/config/api-base-url.token';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-top-right',
      timeOut: 5000,
      extendedTimeOut: 1000,
      easeTime: 300,
      closeButton: false,
      progressBar: true,
      newestOnTop: true,
      preventDuplicates: true,
      tapToDismiss: true,
      disableTimeOut: false
    }),
    provideHttpClient(),
    {
      provide: API_BASE_URL,
      useValue: environment.apiBaseUrl
    }
  ]
};
