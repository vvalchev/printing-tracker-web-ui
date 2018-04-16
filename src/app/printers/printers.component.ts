import { Component, ViewChild, Inject } from '@angular/core';
import { MatSort, MatTableDataSource, MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSelectChange } from '@angular/material';
import { Observable, Subject } from 'rxjs';

import { ConfirmDialogComponent } from '../dialogs/confirm.dialog';

// REST API
import * as s from '../swagger';

@Component({
    selector: 'app-printers',
    templateUrl: './printers.component.html',
    styleUrls: ['./printers.component.scss']
})
export class PrintersComponent {

    @ViewChild(MatSort) sort: MatSort;

    displayedColumns = ['serialNumber', 'brand', 'model', 'dateInstalled', 'customerUic', 'pricePackageId', 'do']
    items = new MatTableDataSource<s.PrintingDevice>();

    constructor(private api: s.PrintingDeviceService,
        private customersApi: s.CustomersService,
        public dialog: MatDialog,
        public snackBar: MatSnackBar) { }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.items.filter = filterValue;
    }

    ngAfterViewInit() {
        this.items.sort = this.sort;
    }

    ngOnInit() {
        this.api.getPrintingDevices().subscribe(
            res => this.items.data = res
        );
    }

    edit(item: any) {
        // създаване или редактиране?
        let create = false;
        if (!item) {
            item = {};
            create = true;
        }

        // отваряне на диалога
        let dialogRef = this.dialog.open(PrintersEditorComponent, {
            width: '80%',
            data: {
                create: create,
                item: item
            }
        });

        // запазване на данните
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                if (result.create) {
                    result.item.dateInstalled = new Date();
                    this.api.createPrintingDevice(result.item).subscribe(
                        res => this.ngOnInit(), // презареждане на таблицата
                        err => this.snackBar.open(`Грешка при създаване на нов принтер!`)
                    );
                } else {
                    this.api.updatePrintingDevice(result.item.serialNumber, result.item).subscribe(
                        res => this.ngOnInit(), // презареждане на таблицата
                        err => this.snackBar.open(`Грешка при обновяване на принтер "${item.serialNumber}"!`)
                    );
                }
            }
        });
    }

    delete(item: s.PrintingDevice) {
        let dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: { content: `Наистина ли желаете да изтриете принтер "${item.serialNumber}"?` }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.api.deletePrintingDevice(item.serialNumber).subscribe(
                    res => this.ngOnInit(), // презареждане на таблицата
                    err => this.snackBar.open(`Грешка при изтриване на принтер "${item.serialNumber}"!`)
                );
            }
        });
    }
}

@Component({
    selector: 'app-printers-editor',
    templateUrl: './printers.editor.component.html',
    styleUrls: ['./printers.component.scss']
})
export class PrintersEditorComponent {

    addresses = new Subject<s.AddressResponse[]>();
    customers: Observable<s.Customer[]>;
    prices: Observable<s.PricePackage[]>
    originalAddress: number;

    constructor(
        public dialogRef: MatDialogRef<PrintersEditorComponent>,
        private pricesApi: s.PricesService,
        private addressApi: s.AddressesService,
        private customersApi: s.CustomersService,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.originalAddress = data.item.addressId;
        this.customers = this.customersApi.getCustomers();
        this.prices = this.pricesApi.getPrices();
        this.addressApi.getAddresses(data.item.customerUic).subscribe(
            res => this.addresses.next(res)
        );
    }

    // при промяна на клиента сменяме и адреса
    onClientSelect(customer: MatSelectChange) {
        this.addressApi.getAddresses(customer.value).subscribe(
            res => {
                this.addresses.next(res);
                this.data.item.addressId = res && res[0] ? res[0].addressId : null;
            }
        );
    }

}
