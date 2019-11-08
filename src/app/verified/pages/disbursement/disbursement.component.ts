// Nguyễn Thanh Tùng
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSnackBar, MatPaginator, MatSort } from '@angular/material';
import { DisbursementService } from 'src/app/service/disbursement.service';
import { ResponseApi } from 'src/app/class/response-api';
import { Disbursement } from 'src/app/class/disbursement'
import { DisbursementInsertComponent } from 'src/app/verified/dialog/disbursement-insert/disbursement-insert.component';
import { from } from 'rxjs';

@Component({
  selector: 'app-disbursement',
  templateUrl: './disbursement.component.html',
  styleUrls: ['./disbursement.component.scss']
})
export class DisbursementComponent implements OnInit {
  displayedColumns: string[] =['disbursementId','versionNumber','Action']
  dataSource: MatTableDataSource<Disbursement> = new MatTableDataSource();
  tempDatasource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private disbursementService: DisbursementService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.paging();
  }

  paging() {
    this.disbursementService.paging().subscribe((res: ResponseApi ) => {
      this.dataSource.data = res.data;

    })
  }
  insert(){
    this.dialog.open(DisbursementInsertComponent,{
      width: '80vw',
      height: '100vh',
      data: { parent: this}
    });
  }
  edit(disbursement: any) {
    this.dialog.open(DisbursementInsertComponent, {
      width: '80vw',
      height: '100vh',
      data: { parent: this, disbursement: disbursement }
    });
  }
  delete(disbursementId: string) {
    if (confirm('Bạn chọn xóa nhân viên. Bạn muốn tiếp tục?')) {
      this.disbursementService.delete(disbursementId).subscribe((res: ResponseApi) => {
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
