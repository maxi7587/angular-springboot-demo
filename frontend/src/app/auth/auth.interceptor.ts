import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) {
    }

    // Once we have received and stored the token we need to pass the token in each subsequent REST call.
    // That can be done with an HttpInterceptor.
    // The token is read from the session storage and added to the Authorization head of the request.
    // It also catches errors, and if the error is a 401 Unauthorized it redirects to the login page.
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = sessionStorage.getItem("app.token");
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                },
            });
        }

        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => this.handleErrorRes(error))
        );
    }

    private handleErrorRes(error: HttpErrorResponse): Observable<never> {
        if (error.status === 401) {
            this.router.navigateByUrl("/login", {replaceUrl: true});
        }
        return throwError(() => error);
    }
}
