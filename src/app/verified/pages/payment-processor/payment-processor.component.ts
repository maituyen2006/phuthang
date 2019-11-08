import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {PaymentProcessor} from '../../../class/payment-processor';
import { ResponseApi } from 'src/app/class/response-api';
import { MatTableDataSource, MatDialog, MatSnackBar, MatPaginator, MatSort } from '@angular/material';
import { from } from 'rxjs';
import { PaymentProcessorService } from 'src/app/service/payment-processor.service';
import { PaymentProcessorInsertComponent } from '../../dialog/payment-processor-insert/payment-processor-insert.component';

@Component({
  selector: 'app-payment-processor',
  templateUrl: './payment-processor.component.html',
  styleUrls: ['./payment-processor.component.scss']
})
export class PaymentProcessorComponent implements OnInit {
  displayedColumns: string[] =['paymentProcessorId','createdBy','Action']
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource <PaymentProcessor>();

  constructor(private paymentprocessorService: PaymentProcessorService, private dialog: MatDialog,
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
    this.paymentprocessorService.paging().subscribe((res: ResponseApi) => {
      this.dataSource.data = res.data;
    })
  
    
  }
  insert(){
    this.dialog.open(PaymentProcessorInsertComponent,{
      width: '600px',
      data: { parent: this}
    });
  }
  edit(payment: PaymentProcessor) {
    this.dialog.open(PaymentProcessorInsertComponent, {
      width: '600px',
      data: { parent: this, paymentprocessor: payment }
    });
  }
  delete(id: number) {
    if (confirm('Bạn chọn xóa gói tín dụng. Bạn muốn tiếp tục?')) {
      this.paymentprocessorService.delete(id).subscribe((res: ResponseApi) => {
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
