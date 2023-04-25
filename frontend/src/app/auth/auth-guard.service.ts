import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {
    }

    // An Angular guard was created to check if the user is logged in and has the correct role to access the views.
    // The guard implements CanActivate. If the user is not logged in or lacks the needed role, it redirects to the login page.
    public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        // The role is defined on the route and is passed to the method.
        if (this.authService.isLoggedIn() && this.authService.isUserInRole(next.routeConfig?.data?.['role'])) {
            return true;
        } else {
            this.router.navigateByUrl("/login");
            return false;
        }
    }
}
