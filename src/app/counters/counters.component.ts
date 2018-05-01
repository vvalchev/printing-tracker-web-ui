import { Component, ViewChild, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSort, MatTableDataSource, MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ConfirmDialogComponent } from '../dialogs/confirm.dialog';

// REST API
import * as s from '../swagger';

@Component({
    selector: 'app-counters',
    templateUrl: './counters.component.html',
    styleUrls: ['./counters.component.scss']
})
export class CountersComponent {

    @ViewChild(MatSort) sort: MatSort;

    deviceSerialNumber: string;
    displayedColumns = [
        'date', 'invoiced', 'monoCounter', 'colorCounter'
    ]
    items = new MatTableDataSource();

    constructor(private api: s.CountersService,
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
            this.deviceSerialNumber = params['deviceSerialNumber'];
            this.api.getCounterReports(this.deviceSerialNumber).subscribe(
                res => {
                    this.items.data = res
                    this.items.sort = this.sort;
                }
            );
        });
    }

    add() {
        let report: s.CreateCounterReport = {
            deviceSerialNumber: this.deviceSerialNumber,
            monoCounter: null
        }
        // отваряне на диалога
        let dialogRef = this.dialog.open(CountersEditorComponent, {
            data: report
        });

        // запазване на данните
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.api.createCounterReport(result).subscribe(
                    res => this.ngOnInit(), // презареждане на таблицата
                    err => this.snackBar.open(`Грешка при създаване на нов адрес!`, '', { duration: 3000 })
                );
            }
        });
    }
}

@Component({
    selector: 'app-counters-editor',
    templateUrl: './counters.editor.component.html',
    styleUrls: ['./counters.component.scss']
})
export class CountersEditorComponent {

    constructor(
        public dialogRef: MatDialogRef<CountersEditorComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

}
