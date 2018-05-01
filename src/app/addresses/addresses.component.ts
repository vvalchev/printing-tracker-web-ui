import { Component, ViewChild, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSort, MatTableDataSource, MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ConfirmDialogComponent } from '../dialogs/confirm.dialog';

// REST API
import * as s from '../swagger';

@Component({
    selector: 'app-addresses',
    templateUrl: './addresses.component.html',
    styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent {

    @ViewChild(MatSort) sort: MatSort;

    customerUic: string;
    displayedColumns = [
        'country', 'region', 'city', 'postalCode', 'streetAddress', 'streetNumber', 'notes', 'do'
    ]

    items = new MatTableDataSource();

    constructor(private api: s.AddressesService,
        public dialog: MatDialog,
        public snackBar: MatSnackBar,
        private route: ActivatedRoute) { }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.items.filter = filterValue;
    }

    ngAfterViewInit() {
        this.items.sort = this.sort;
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.customerUic = params['customerUic'];
            this.api.getAddresses(this.customerUic).subscribe(
                res => this.items.data = res
            );
        });
    }

    edit(item: any) {
        // създаване или редактиране?
        let create = false;
        if (!item) {
            item = {};
            create = true;
        }

        // отваряне на диалога
        let dialogRef = this.dialog.open(AddressesEditorComponent, {
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
                    result.item.customerUic = this.customerUic;
                    this.api.createAddresse(result.item).subscribe(
                        res => this.ngOnInit(), // презареждане на таблицата
                        err => this.err(`Грешка при създаване на нов адрес!`)
                    );
                } else {
                    this.api.updateAddress(result.item.addressId, result.item).subscribe(
                        res => this.ngOnInit(), // презареждане на таблицата
                        err => this.err(`Грешка при обновяване на адрес "${item.streetAddress}"!`)
                    );
                }
            }
        });
    }

    delete(item: s.AddressResponse) {
        let dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: { content: `Наистина ли желаете да изтриете адрес "${item.streetAddress}"?` }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.api.deleteAddress(item.addressId).subscribe(
                    res => this.ngOnInit(), // презареждане на таблицата
                    err => this.err(`Грешка при изтриване на адрес "${item.streetAddress}"!`)
                );
            }
        });
    }

    private err(message: string) {
        this.snackBar.open(message, '', {
            duration: 3000
        });
    }
}

@Component({
    selector: 'app-addresses-editor',
    templateUrl: './addresses.editor.component.html',
    styleUrls: ['./addresses.component.scss']
})
export class AddressesEditorComponent {

    constructor(
        public dialogRef: MatDialogRef<AddressesEditorComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

}
