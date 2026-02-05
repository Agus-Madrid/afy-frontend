import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { catchError, Observable } from "rxjs";
import { NotificationService } from "../services/notification.service";
import { inject } from "@angular/core";

let httpErrorInterceptorEnabled = true;

export function setHttpErrorInterceptorEnabled(enabled: boolean): void {
    httpErrorInterceptorEnabled = enabled;
}

export function disableHttpErrorInterceptor(): void {
    setHttpErrorInterceptorEnabled(false);
}

export function enableHttpErrorInterceptor(): void {
    setHttpErrorInterceptorEnabled(true);
}

export function httpErrorInterceptor(
    req: HttpRequest<unknown>,
    next: HttpHandlerFn ): Observable<HttpEvent<unknown>> {
    const notificationService = inject(NotificationService);

    console.log('HTTP Error Interceptor - Enabled:', httpErrorInterceptorEnabled);

    if (!httpErrorInterceptorEnabled) {
        console.log('HTTP Error Interceptor is disabled.');
        return next(req);
    }

    return next(req).pipe(
        catchError((error) => {
            const errorMessage = error?.message || 'Ocurrió un error desconocido';
            notificationService.showError(`Error HTTP: ${errorMessage}`);
            throw error;
        })
    );
}
