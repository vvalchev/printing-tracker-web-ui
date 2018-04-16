import { Component, ViewChild, Inject } from '@angular/core';
import { MatSort, MatTableDataSource, MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';

import { ConfirmDialogComponent } from '../dialogs/confirm.dialog';

// REST API
import * as s from '../swagger';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent {

    @ViewChild(MatSort) sort: MatSort;

    displayedColumns = [
        'username', 'displayName', 'customerUic', 'do'
    ]
    items = new MatTableDataSource<s.UserResponse>();

    constructor(private api: s.UsersService,
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
        this.api.getUsers().subscribe(
            res => this.items.data = res
        );
    }

    isAdmin(user: s.UserResponse): boolean {
        return user.roles && user.roles.indexOf('ROLE_ADMIN') >= 0;
    }

    edit(item: s.UserResponse) {
        let data = {
            customers: null,
            item: item
        }
        // отваряне на диалога
        let dialogRef = this.dialog.open(UsersEditorComponent, {
            width: '80%',
            data: data
        });

        this.customersApi.getCustomers().subscribe(
            res => data.customers = res
        );

        // запазване на данните
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.api.updateUser(result.item.userId, result.item).subscribe(
                    res => this.ngOnInit(), // презареждане на таблицата
                    err => this.snackBar.open(`Грешка при обновяване на данните за потребител "${item.username}"!`)
                );
            }
        });
    }

    delete(item: s.UserResponse) {
        let dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: { content: `Наистина ли желаете да изтриете потребител ${item.username}?` }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.api.deleteUser(item.userId).subscribe(
                    res => this.ngOnInit(), // презареждане на таблицата
                    err => this.snackBar.open(`Грешка при изтриване на потребител ${item.username}!`)
                )
            }
        });
    }
}

@Component({
    selector: 'app-users-editor',
    templateUrl: './users.editor.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersEditorComponent {

    customers: Observable<s.Customer[]>;

    hide1 = true;
    hide2 = true;

    constructor(
        public dialogRef: MatDialogRef<UsersEditorComponent>,
        private customersApi: s.CustomersService,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.customers = this.customersApi.getCustomers();
    }

}
