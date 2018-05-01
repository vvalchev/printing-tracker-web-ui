import { Component, ViewChild, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSort, MatTableDataSource, MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ConfirmDialogComponent } from '../dialogs/confirm.dialog';

// REST API
import * as s from '../swagger';

@Component({
    selector: 'app-customers',
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.scss']
})
export class CustomersComponent {

    @ViewChild(MatSort) sort: MatSort;

    displayedColumns = [
        'uic', 'displayName', 'notes', 'do'
    ]
    items = new MatTableDataSource<s.Customer>();

    constructor(private api: s.CustomersService,
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
        this.api.getCustomers().subscribe(
            res => {
                this.items.data = res;
                this.autoEdit();
            }
        );
    }

    autoEdit() {
        this.route.params.subscribe(params => {
            let uic = params['uic'];
            let item = this.items.data.find(e => e.uic == uic);
            if (item) {
                this.edit(item);
            }
        });
    }

    edit(item: s.Customer) {
        // създаване или редактиране?
        let create = false;
        if (!item) {
            item = { uic: '', displayName: '' };
            create = true;
        }

        // отваряне на диалога
        let dialogRef = this.dialog.open(CustomersEditorComponent, {
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
                    this.api.createCustomer(result.item).subscribe(
                        res => this.ngOnInit(), // презареждане на таблицата
                        err => this.err(`Грешка при създаване на нов клиент!`)
                    );
                } else {
                    this.api.updateCustomer(result.item.uic, result.item).subscribe(
                        res => this.ngOnInit(), // презареждане на таблицата
                        err => this.err(`Грешка при обновяване на клиент "${item.displayName}"!`)
                    );
                }
            }
        });
    }

    delete(item: s.Customer) {
        let dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: { content: `Наистина ли желаете да изтриете клиент "${item.displayName}"?` }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.api.deleteCustomer(item.uic).subscribe(
                    res => this.ngOnInit(), // презареждане на таблицата
                    err => this.err(`Грешка при изтриване на клиент "${item.displayName}"!`)
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
    selector: 'app-customers-editor',
    templateUrl: './customers.editor.component.html',
    styleUrls: ['./customers.component.scss']
})
export class CustomersEditorComponent {

    constructor(
        public dialogRef: MatDialogRef<CustomersEditorComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

}
