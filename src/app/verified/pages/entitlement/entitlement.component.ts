import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSnackBar, MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Entitlement } from '../../../class/entitlement';
import { EntitlementService } from 'src/app/service/entitlement.service';
import { from } from 'rxjs';
import { ResponseApi } from 'src/app/class/response-api';
import { EntitlementInsertComponent } from '../../dialog/entitlement-insert/entitlement-insert.component';
import { duration } from 'moment';
@Component({
  selector: 'app-entitlement',
  templateUrl: './entitlement.component.html',
  styleUrls: ['./entitlement.component.scss']
})
export class EntitlementComponent implements OnInit {
  displayedColumns: string[] = ['entitlementId', 'name', 'createdBy', 'Action'];

  dataSource = new MatTableDataSource<Entitlement>();


  constructor(private entitlementService: EntitlementService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.paging();
  }

  paging() {
    this.entitlementService.paging().subscribe((res: ResponseApi) => {
      this.dataSource.data = res.data;
      console.log(this.dataSource.data);
    });
  }

  insert() {
    this.dialog.open(EntitlementInsertComponent, {
      width: '600px',
      data: { parent: this }
    });
  }
  edit(entitSeleted: any) {
    this.dialog.open(EntitlementInsertComponent, {
      width: '600px',
      data: { parent: this, entitlement: entitSeleted }
    });
  }
  delete(id: number) {
    if (confirm('Bạn chọn xóa gói tín dụng. Bạn muốn tiếp tục')) {
      this.entitlementService.delete(id).subscribe((res: ResponseApi) => {
        this.paging();
        if (res.success) {
          this.snackBar.open(res.message, 'Đóng', {
            panelClass: ['style-success'],
            duration: 25000
          });
        } else {
          this.snackBar.open(res.message, 'Đóng', {
            panelClass: ['style-error'],
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
}
