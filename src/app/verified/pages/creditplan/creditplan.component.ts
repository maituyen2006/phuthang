import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {Creditplan} from '../../../class/creditplan';
import { CreditplanInsertComponent } from '../../dialog/creditplan-insert/creditplan-insert.component';
import { ResponseApi } from 'src/app/class/response-api';
import { MatTableDataSource, MatDialog, MatSnackBar, MatPaginator, MatSort } from '@angular/material';
import { from } from 'rxjs';
import { CreditplanService } from 'src/app/service/creditplan.service';


@Component({
  selector: 'app-creditplan',
  templateUrl: './creditplan.component.html',
  styleUrls: ['./creditplan.component.scss']
})
export class CreditplanComponent implements OnInit {
  displayedColumns: string[] =['creditPlanId','createdOn','createdBy','modifiedOn','modifiedBy','Action']
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource <Creditplan>();

  constructor(private creditService: CreditplanService, private dialog: MatDialog,
    private snackBar: MatSnackBar,) { }

  ngOnInit() {
  
  }
  ngAfterViewInit() {
    this.paging();
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  paging(){
    this.creditService.paging().subscribe((res: ResponseApi) => {
      this.dataSource.data = res.data;
    })
  
    
  }
  insert(){
    this.dialog.open(CreditplanInsertComponent,{
      width: '90vw',
      maxHeight: '90vh',
      data: { parent: this}
    });
  }
  edit(credit: Creditplan) {
    this.dialog.open(CreditplanInsertComponent, {
      width: '90vw',
      maxHeight: '90vh',
      data: { parent: this, creditplan: credit }
    });
  }
  delete(id: number) {
    if (confirm('Bạn chọn xóa gói tín dụng. Bạn muốn tiếp tục?')) {
      this.creditService.delete(id).subscribe((res: ResponseApi) => {
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
