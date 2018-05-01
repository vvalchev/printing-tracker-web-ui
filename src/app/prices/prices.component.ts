import { Component, ViewChild, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSort, MatTableDataSource, MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ConfirmDialogComponent } from '../dialogs/confirm.dialog';

// REST API
import * as s from '../swagger';

@Component({
    selector: 'app-prices',
    templateUrl: './prices.component.html',
    styleUrls: ['./prices.component.scss']
})
export class PricesComponent {

    @ViewChild(MatSort) sort: MatSort;

    displayedColumns = [
        'numbersMonoInPackage', 'priceMonoPackage', 'priceMonoCopyOverPackage',
        'numbersColorInPackage', 'priceColorPackage', 'priceColorCopyOverPackage',
        'do'
    ]
    items = new MatTableDataSource<s.PricePackage>();

    constructor(private api: s.PricesService,
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
        this.api.getPrices().subscribe(
            res => {
                this.items.data = res;
                this.autoEdit();
            }
        );
    }

    autoEdit() {
        this.route.params.subscribe(params => {
            let pricePackageId = params['pricePackageId'];
            let item = this.items.data.find(e => e.pricePackageId == pricePackageId);
            if (item) {
                this.edit(item);
            }
        });
    }

    edit(item: s.PricePackage) {
        // създаване или редактиране?
        let create = false;
        if (!item) {
            item = { numbersMonoInPackage: null, priceMonoPackage: null, priceMonoCopyOverPackage: null, pricePackageId: null };
            create = true;
        }

        // отваряне на диалога
        let dialogRef = this.dialog.open(PricesEditorComponent, {
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
                    this.api.createPrice(result.item).subscribe(
                        res => this.ngOnInit(), // презареждане на таблицата
                        err => this.err(`Грешка при създаване на пакетна цена!`)
                    );
                } else {
                    this.api.updatePrice(result.item.pricePackageId, result.item).subscribe(
                        res => this.ngOnInit(), // презареждане на таблицата
                        err => this.err(`Грешка при обновяване на избраната пакетна цена!`)
                    );
                }
            }
        });
    }

    delete(item: s.PricePackage) {
        let dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: { content: `Наистина ли желаете да изтриете пакет с моно цена ${item.priceMonoPackage}? и включени ${item.numbersMonoInPackage} страници в моно пакета?` }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.api.deletePrice(item.pricePackageId).subscribe(
                    res => this.ngOnInit(), // reload the data
                    err => this.err(`Грешка при изтриване на избраната пакетна цена!`)
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
    selector: 'app-prices-editor',
    templateUrl: './prices.editor.component.html',
    styleUrls: ['./prices.component.scss']
})
export class PricesEditorComponent {

    constructor(
        public dialogRef: MatDialogRef<PricesEditorComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

}
