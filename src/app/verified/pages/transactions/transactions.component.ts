import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Transactions } from 'src/app/class/transactions';
import { MatSnackBar, MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ResponseApi } from 'src/app/class/response-api';
import { TransactionsService } from '../../../service/transactions.service';
import { TransactionsInsertComponent } from 'src/app/verified/dialog/transactions-insert/transactions-insert.component';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] =['transactionId','name','amount','Action'];
  dataSource: MatTableDataSource<Transactions> = new MatTableDataSource();
  constructor(private transactionsService:TransactionsService ,private snackBar:MatSnackBar,private dialog: MatDialog) { }

  ngOnInit() {
    this.paging();
  }
  paging(){
    this.transactionsService.paging().subscribe((res: ResponseApi ) => {
      this.dataSource.data = res.data;
      this.dataSource.sort = this.sort;
      
    })
  }

  delete(transactionId:number){
    if (confirm('Bạn chọn xóa nhân viên. Bạn muốn tiếp tục?')) {
      this.transactionsService.delete(transactionId).subscribe((res: ResponseApi) => {
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
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  insert(){
    this.dialog.open(TransactionsInsertComponent,{
      width: '600px',
      data: { parent: this}
    });
  }
  edit(transactionsSelected: any) {
    this.dialog.open(TransactionsInsertComponent, {
      width: '600px',
      data: { parent: this, transactions: transactionsSelected }
    });
  }

}
