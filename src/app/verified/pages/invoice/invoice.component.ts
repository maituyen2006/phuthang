import { Component, OnInit } from '@angular/core';
import {Invoice} from '../../../class/invoice'
import { MatSnackBar, MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { InvoiceService } from 'src/app/service/invoice.service';
import { ResponseApi } from 'src/app/class/response-api';
import { InvoiceInsertComponent } from '../../dialog/invoice-insert/invoice-insert.component';
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  displayedColumns: string[] =['invoiceId','name','emailAddress','Action'];
  dataSource: MatTableDataSource<Invoice> = new MatTableDataSource();

  constructor(private invoiceService: InvoiceService,private snackBar:MatSnackBar,
    private dialog: MatDialog) { }

    ngOnInit() {
    }
    ngAfterViewInit() {
      this.paging();
    }
    paging(){
      this.invoiceService.paging().subscribe((res: ResponseApi ) => {
        this.dataSource.data = res.data;

      })
    }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  insert(){
    this.dialog.open(InvoiceInsertComponent,{
      width: '600px',
      data: { parent: this}
    });

  }
  edit(invoiceSelected: any) {
    this.dialog.open(InvoiceInsertComponent, {
      width: '600px',
      data: { parent: this, invoi: invoiceSelected }
    });
  }
  delete(id: number) {
    if (confirm('Bạn chọn xóa hóa đơn này. Bạn muốn tiếp tục?')) {
      this.invoiceService.delete(id).subscribe((res: ResponseApi) => {
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
  block(id: number) {
    this.invoiceService.block(id).subscribe((res: ResponseApi) => {
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
