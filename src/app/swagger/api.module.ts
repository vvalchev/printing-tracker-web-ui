import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Configuration } from './configuration';

import { AddressesService } from './api/addresses.service';
import { AuthenticationService } from './api/authentication.service';
import { CountersService } from './api/counters.service';
import { CustomersService } from './api/customers.service';
import { InvoicesService } from './api/invoices.service';
import { PricesService } from './api/prices.service';
import { PrintingDeviceService } from './api/printingDevice.service';
import { UsersService } from './api/users.service';

@NgModule({
  imports:      [ CommonModule, HttpClientModule ],
  declarations: [],
  exports:      [],
  providers: [
    AddressesService,
    AuthenticationService,
    CountersService,
    CustomersService,
    InvoicesService,
    PricesService,
    PrintingDeviceService,
    UsersService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        }
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import your base AppModule only.');
        }
    }
}
