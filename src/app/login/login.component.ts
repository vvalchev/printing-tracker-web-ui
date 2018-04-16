import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ErrorStateMatcher } from '@angular/material/core';

import { AppComponent } from '../app.component';
// REST API
import * as s from '../swagger';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    hide = true;
    // вход
    username: string;
    password: string;
    rememberMe: true;
    // регистрация
    hide1 = true;
    hide2 = true;
    usernameR: string;
    nameR: string;
    passwordR1: string;
    passwordR2: string;
    matcher = new SamePasswordErrorStateMatcher();

    constructor(private api: s.AuthenticationService,
        private usersApi: s.UsersService,
        public snackBar: MatSnackBar,
        private app: AppComponent,
        private router: Router) { }

    login() {
        this.api.login(
            this.password,
            this.username,
            this.rememberMe
        ).subscribe(
            res => {
                localStorage.setItem('token', res.idToken);
                this.app.setToken(res.idToken);
                this.router.navigate(['/']);
            }
        );
    }

    register() {
        this.usersApi.createUser({
            username: this.usernameR,
            displayName: this.nameR,
            password: this.passwordR1,
            passwordConfirmation: this.passwordR2
        }).subscribe(
            res => this.snackBar.open('Вашият потребител е създаден успешно. Отворете "Вход" и влезте в системата!'),
            err => this.snackBar.open('Грешка при регистрация! Проверете данните, които сте въвели и опитайте отново!')
        );
    }

}

export class SamePasswordErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return form ? form.value.password !== form.value.passwordConfirmation : false;
  }
}
