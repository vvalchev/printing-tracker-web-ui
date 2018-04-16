import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkTableModule } from '@angular/cdk/table';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatSidenavModule,
    MatSortModule,
    MatSnackBarModule,
    MatTabsModule,
    MatTableModule,
    MatToolbarModule,
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CustomersComponent, CustomersEditorComponent } from './customers/customers.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent, UsersEditorComponent } from './users/users.component';
import { AddressesComponent, AddressesEditorComponent } from './addresses/addresses.component';
import { PricesComponent, PricesEditorComponent } from './prices/prices.component';
import { PrintersComponent, PrintersEditorComponent } from './printers/printers.component';
import { CountersComponent, CountersEditorComponent } from './counters/counters.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { ConfirmDialogComponent } from './dialogs/confirm.dialog';

import { BearerTokenInterceptorService } from './services/bearer-token-interceptor.service';

import { ApiModule } from './swagger';


@NgModule({
    declarations: [
        AppComponent,
        CustomersComponent,
        CustomersEditorComponent,
        LoginComponent,
        UsersComponent,
        UsersEditorComponent,
        AddressesComponent,
        AddressesEditorComponent,
        PricesComponent,
        PricesEditorComponent,
        PrintersComponent,
        PrintersEditorComponent,
        CountersComponent,
        CountersEditorComponent,
        InvoicesComponent,
        ConfirmDialogComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        CdkTableModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatSelectModule,
        MatSidenavModule,
        MatSortModule,
        MatSnackBarModule,
        MatTabsModule,
        MatTableModule,
        MatToolbarModule,

        AppRoutingModule,
        ApiModule,
    ],
    entryComponents: [
        ConfirmDialogComponent,
        PricesEditorComponent,
        CustomersEditorComponent,
        UsersEditorComponent,
        AddressesEditorComponent,
        PrintersEditorComponent,
        CountersEditorComponent,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: BearerTokenInterceptorService, multi: true },
        { provide: LocationStrategy, useClass: HashLocationStrategy } // otherwise nginnx reload doesn't work
    ],
    bootstrap: [AppComponent],
    exports: [
        CustomersComponent,
        CustomersEditorComponent,
        LoginComponent,
        UsersComponent,
        AddressesComponent,
        AddressesEditorComponent,
        PricesComponent,
        PricesEditorComponent,
        PrintersComponent, CountersComponent,
        InvoicesComponent,
        ConfirmDialogComponent
    ]
})
export class AppModule { }
