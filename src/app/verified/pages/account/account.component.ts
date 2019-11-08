import { Component, OnInit, ViewChild } from '@angular/core';
import { Account } from '../../../class/account';
import { AccountInsertComponent } from '../../dialog/account-insert/account-insert.component';
import { ResponseApi } from 'src/app/class/response-api';
import { MatTableDataSource, MatDialog, MatSnackBar, MatPaginator } from '@angular/material';
import { AccountService } from 'src/app/service/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  displayedColumns: string[] = ['name', 'accountNumber', 'eMailAddress1', 'telephone1', 'address1City', 'Action']
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<Account>();
  constructor(private snackBar: MatSnackBar,
    private accountService: AccountService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.paging();
  }
  paging() {
    this.accountService.paging().subscribe((res: ResponseApi) => {
      this.dataSource.data = res.data;
    })
  }
  insert() {
    this.dialog.open(AccountInsertComponent, {
      width: '90vw',
      maxHeight: '90vh',
      data: { parent: this }
    });
  }
  edit(accountSelected: any) {
    this.dialog.open(AccountInsertComponent, {
      width: '90vw',
      maxHeight: '90vh',
      data: { parent: this, account: accountSelected }
    });
  }
  delete(id: number) {
    if (confirm('Bạn chọn xóa nhân viên. Bạn muốn tiếp tục?')) {
      this.accountService.delete(id).subscribe((res: ResponseApi) => {
        this.paging();
        if (res.success) {
          this.snackBar.open(res.message, 'Đóng', {
            panelClass: ['style-success'],
            duration: 2500
          });
        } else {
          this.snackBar.open(res.message, 'Đóng', {
            panelClass: ['style-error'],
            duration: 2500
          });
        }
      });
    }
  }

}
