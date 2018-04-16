import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { JwtHelperService } from '@auth0/angular-jwt';

const MAX_THEMES = 5;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styles: [],
})
export class AppComponent {
    title = 'app';
    theme = 0;
    dark = false;
    token: any;

    constructor(
        private _element: ElementRef,
        private _overlayContainer: OverlayContainer,
        private router: Router,
        private snackBar: MatSnackBar) {
        this.setToken(localStorage.getItem('token'));
        this.theme = +localStorage.getItem('theme') % MAX_THEMES;
        this.setTheme();
    }

    setToken(raw) {
        if (raw) {
            let jwtService = new JwtHelperService();
            try {
                if (!jwtService.isTokenExpired(raw)) {
                    this.token = jwtService.decodeToken(raw);
                    console.log('token', this.token);
                }
            } catch (e) {
                this.clearToken();
            }
        } else {
            this.clearToken();
        }
    }

    toggleTheme() {
        this.theme = (++this.theme) % MAX_THEMES;
        localStorage.setItem('theme', this.theme.toString());
        this.setTheme();
    }

    private setTheme() {
        // remove all theme classes
        for (let i =0; i<MAX_THEMES; i++) {
            this._element.nativeElement.classList.remove('theme-'+i);
            this._overlayContainer.getContainerElement().classList.remove('theme-'+i);
        }
        // add the selected theme class
        if (this.theme != 0) {
            this._element.nativeElement.classList.add('theme-'+this.theme);
            this._overlayContainer.getContainerElement().classList.add('theme-'+this.theme);
        }
    }

    isAdmin(): boolean {
        return true;

//FIXME: return this.token && this.token.auth === 'ROLE_ADMIN';
    }

    login() {
        this.router.navigate(['login']);
    }

    logout() {
        this.clearToken();
        this.login();
    }

    changePassword() {
        // FIXME:
        this.snackBar.open('Тази функция все още не е достъпна!');
    }

    private clearToken() {
        localStorage.removeItem('token');
        this.token = null;
    }

}
