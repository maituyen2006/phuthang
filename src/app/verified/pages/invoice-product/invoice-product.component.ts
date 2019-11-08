import { Component, OnInit } from '@angular/core';
import { InvoiceProduct } from 'src/app/class/invoice-product';
import { MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { InvoiceProductService } from 'src/app/service/invoice-product.service';
import { ResponseApi } from 'src/app/class/response-api';
import { InvoiceProductInsertComponent } from '../../dialog/invoice-product-insert/invoice-product-insert.component';

@Component({
  selector: 'app-invoice-product',
  templateUrl: './invoice-product.component.html',
  styleUrls: ['./invoice-product.component.scss']
})
export class InvoiceProductComponent implements OnInit {
  displayedColumns: string[] = ['invoiceProductID','invoiceId', 'productName','createdBy' ,'Action'];
  dataSource: MatTableDataSource<InvoiceProduct> = new MatTableDataSource();
  constructor(private invoiceproductService : InvoiceProductService, private snackBar: MatSnackBar,
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
    this.invoiceproductService.paging().subscribe((res: ResponseApi ) => {
      this.dataSource.data = res.data;
    })
  }
  insert() {
    this.dialog.open(InvoiceProductInsertComponent, {
      width: '90vw',
      maxHeight:'90vh',
      data: { parent: this }
    });
  }
  delete(id: number) {
    if (confirm('Bạn chọn xóa hóa đơn. Bạn muốn tiếp tục?')) {
      this.invoiceproductService.delete(id).subscribe((res: ResponseApi) => {
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
  edit(invoiceselected: any) {
    this.dialog.open(InvoiceProductInsertComponent, {
      width: '90vw',
      maxHeight:'90vh',
      data: { parent: this, invoiceProduct: invoiceselected }
    });
  }
}
