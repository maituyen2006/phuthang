// Nguyễn Thanh Tùng
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { TransactionCategory } from 'src/app/class/transaction-category';
import { TransactionCategoryService } from 'src/app/service/transaction-category.service';
import { ResponseApi } from 'src/app/class/response-api';
import { TransactionCategoryInsertComponent } from '../../dialog/transaction-category-insert/transaction-category-insert.component';
import { from } from 'rxjs';

@Component({
  selector: 'app-transaction-category',
  templateUrl: './transaction-category.component.html',
  styleUrls: ['./transaction-category.component.scss']
})
export class TransactionCategoryComponent implements OnInit {
  displayedColumns: string[] =['transactionCategoryId','createdBy','Action']
  dataSource: MatTableDataSource<TransactionCategory> = new MatTableDataSource();
  tempDatasource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private transactionCategoryService: TransactionCategoryService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.paging();
  }

  paging() {
    this.transactionCategoryService.paging().subscribe((res: ResponseApi ) => {
      this.dataSource.data = res.data;

    })
  }
  insert(){
    this.dialog.open(TransactionCategoryInsertComponent,{
      width: '600px',
      data: { parent: this}
    });
  }
  edit(transactionCategory: any) {
    this.dialog.open(TransactionCategoryInsertComponent, {
      width: '600px',
      data: { parent: this, transactionCategory: transactionCategory }
    });
  }
  delete(transactionCategoryId: string) {
    if (confirm('Bạn chọn xóa nhân viên. Bạn muốn tiếp tục?')) {
      this.transactionCategoryService.delete(transactionCategoryId).subscribe((res: ResponseApi) => {
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
