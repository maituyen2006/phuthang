import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { Deliveryframework } from 'src/app/class/deliveryframework';
import { DeliveryframeworkService } from 'src/app/service/deliveryframework.service';
import { ResponseApi } from 'src/app/class/response-api';
import { DeliveryframeworkInsertComponent } from '../../dialog/deliveryframework-insert/deliveryframework-insert.component';

@Component({
  selector: 'app-deliveryframework',
  templateUrl: './deliveryframework.component.html',
  styleUrls: ['./deliveryframework.component.scss']
})
export class DeliveryframeworkComponent implements OnInit {

  displayedColumns: string[] = ['deliveryFrameworkId','name', 'description','Action'];
  dataSource: MatTableDataSource<Deliveryframework> = new MatTableDataSource();
  constructor(private deliveryframeworkService : DeliveryframeworkService, private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.paging();
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  paging(){
    this.deliveryframeworkService.paging().subscribe((res: ResponseApi ) => {
      this.dataSource.data = res.data;
    })
  }
  insert() {
    this.dialog.open(DeliveryframeworkInsertComponent, {
      width: '90vw',
      maxHeight:'90vh',
      data: { parent: this }
    });
  }
  delete(id: number) {
    if (confirm('Bạn chọn xóa hóa đơn. Bạn muốn tiếp tục?')) {
      this.deliveryframeworkService.delete(id).subscribe((res: ResponseApi) => {
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
  edit(deliveryframeworkselected: any) {
    this.dialog.open(DeliveryframeworkInsertComponent, {
      width: '90vw',
      maxHeight:'90vh',
      data: { parent: this, deliveryframework: deliveryframeworkselected }
    });
  }
}

