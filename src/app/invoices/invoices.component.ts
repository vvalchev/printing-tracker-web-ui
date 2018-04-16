import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';

// REST API
import * as s from '../swagger';

@Component({
    selector: 'app-invoices',
    templateUrl: './invoices.component.html',
    styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent {

    @ViewChild(MatSort) sort: MatSort;

    deviceSerialNumber: string;
    displayedColumns = [
        'date', 'totalPrice', 'paid',
        'lastInvoicedMonoCounter', 'monoCounterForInvoiceing', 'priceMono',
        'lastInvoicedColorCounter', 'colorCounterForInvoiceing', 'priceColor',
        'do'
    ]

    items = new MatTableDataSource();

    constructor(private api: s.InvoicesService,
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
            this.deviceSerialNumber = params['deviceSerialNumber'];
            this.api.getInvoice(this.deviceSerialNumber).subscribe(
                res => this.items.data = res
            );
        });
    }

    markAsPaid(invoice: s.Invoice) {
        this.api.markAsPaid(invoice.invoiceId).subscribe(
            res => this.ngOnInit(), // презареждане на таблицата
            err => this.snackBar.open(`Грешка при маркиране на фактурата като платена!`)
        )
    }
}
