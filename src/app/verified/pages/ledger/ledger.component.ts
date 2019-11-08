import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Ledger } from 'src/app/class/ledger';
import { MatSnackBar, MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ResponseApi } from 'src/app/class/response-api';
import { LedgerService } from '../../../service/ledger.service';
import { LedgerInsertComponent } from 'src/app/verified/dialog/ledger-insert/ledger-insert.component'


@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.scss']
})
export class LedgerComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] =['ledgerId','name','description','Action'];
  dataSource: MatTableDataSource<Ledger> = new MatTableDataSource();
  constructor(private ledgerService:LedgerService ,private snackBar:MatSnackBar,private dialog: MatDialog) { }

  ngOnInit() {
    this.paging();
  
  }
  paging(){
    this.ledgerService.paging().subscribe((res: ResponseApi ) => {
      this.dataSource.data = res.data;
      this.dataSource.sort = this.sort;
      
    })
  }
  insert(){
    this.dialog.open(LedgerInsertComponent,{
      width: '600px',
      data: { parent: this}
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  delete(ledgerId:number){
    if (confirm('Bạn chọn xóa nhân viên. Bạn muốn tiếp tục?')) {
      this.ledgerService.delete(ledgerId).subscribe((res: ResponseApi) => {
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
  edit(ledgerSelected: any) {
    this.dialog.open(LedgerInsertComponent, {
      width: '600px',
      data: { parent: this, ledger: ledgerSelected }
    });
  }

}
