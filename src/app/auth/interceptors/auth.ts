import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const isApiUrl = request.url.startsWith(environment.apiURL);
        if (isApiUrl) {
            request = request.clone({
                setHeaders: { 'x-access-token': `${this.authenticationService.getToken()}` }
            });
            if (!environment.production) {
                console.log(request.url);
            }
        }
        return next.handle(request);
    }
}
