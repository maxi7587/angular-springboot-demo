import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) {
    }

    isLoggedIn(): boolean {
        return sessionStorage.getItem("app.token") != null;
    }

    login(username: string, password: string): Observable<string> {
        const httpOptions = {
            headers: {
                Authorization: 'Basic ' + window.btoa(username + ':' + password)
            },
            responseType: 'text' as 'text',
        };
        return this.http.post("/api/auth", null, httpOptions);
    }

    logout() {
        sessionStorage.removeItem("app.token");
        sessionStorage.removeItem("app.roles");
    }

    // In isUserInRole, the roles are fetched from the session storage and then checked against the passed role.
    isUserInRole(roleFromRoute: string) {
        const roles = sessionStorage.getItem("app.roles");


        // this check works, but it's not correctly written (can discuss in the event)
        if (roles!.includes(",")) {
            if (roles === roleFromRoute) {
                return true;
            }
        } else {
            const roleArray = roles!.split(",");
            for (let role of roleArray) {
                if (role === roleFromRoute) {
                    return true;
                }
            }
        }
        return false;
    }
}
