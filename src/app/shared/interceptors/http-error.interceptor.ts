import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { catchError, Observable } from "rxjs";
import { NotificationService } from "../services/notification.service";
import { inject } from "@angular/core";

export function httpErrorInterceptor(
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
    const notificationService = inject(NotificationService);

    return next(req).pipe(
        catchError((error) => {
            const errorMessage = error?.message || 'Ocurrió un error desconocido';
            notificationService.showError(`Error HTTP: ${errorMessage}`);
            throw error;
        })
    );
}