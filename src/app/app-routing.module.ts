import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddressesComponent } from './addresses/addresses.component';
import { CountersComponent } from './counters/counters.component';
import { CustomersComponent } from './customers/customers.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { LoginComponent } from './login/login.component';
import { PricesComponent } from './prices/prices.component';
import { PrintersComponent } from './printers/printers.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
    { path: 'addresses/:customerUic', component: AddressesComponent },
    { path: 'counters/:deviceSerialNumber', component: CountersComponent },
    { path: 'invoices/:deviceSerialNumber', component: InvoicesComponent },
    { path: 'customers', component: CustomersComponent },
    { path: 'customers/:uic', component: CustomersComponent },
    { path: 'login', component: LoginComponent },
    { path: 'prices', component: PricesComponent },
    { path: 'prices/:pricePackageId', component: PricesComponent },
    { path: 'printers', component: PrintersComponent },
    { path: 'users', component: UsersComponent },
    { path: '**', component: PrintersComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
