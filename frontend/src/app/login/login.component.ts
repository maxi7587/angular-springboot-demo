import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import jwtDecode, {JwtPayload} from 'jwt-decode';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    username: string = "";
    password: string = "";
    message: string = "";

    constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
    }

    // The login() method calls the AuthService which issues a call to the token endpoint with basic authentication.
    // It subscribes to get the token and first stores it in the session storage.
    // Then extracts the roles and stores them in the session storage as well.
    // Then redirects to the /persons view (shuold be people)
    public login(): void {
        sessionStorage.removeItem("app.token");

        this.authService.login(this.username, this.password)
            .subscribe({
                next: (token) => {
                    sessionStorage.setItem("app.token", token);

                    const decodedToken = jwtDecode<JwtPayload>(token);
                    // @ts-ignore
                    sessionStorage.setItem("app.roles",  decodedToken.scope);

                    this.router.navigateByUrl("/persons");
                },
                // We're using Angular Material, so when an error occurs, we use the Snackbar component to display the error message.
                error: (error) => this.snackBar.open(`Login failed: ${error.status}`, "OK")
            });
    }
}
