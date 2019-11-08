import { Component, OnInit } from '@angular/core';
import {PaymentMethod} from '../../../class/payment-method';
import { ResponseApi } from 'src/app/class/response-api';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { PaymentMethodService } from 'src/app/service/payment-method.service';
import { PaymentMethodInsertComponent } from '../../dialog/payment-method-insert/payment-method-insert.component';
import { from } from 'rxjs';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent implements OnInit {
  displayedColumns: string[]=['paymentMethodId','createdBy','modifiedBy','importSequenceNumber','versionNumber', 'name','comments','transactionId', 'Action']
  dataSource = new MatTableDataSource<PaymentMethod>();
  constructor(private paymentmethodService: PaymentMethodService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.paging();
  }
  paging(){
    this.paymentmethodService.paging().subscribe((res: ResponseApi ) => {
      this.dataSource.data = res.data;
    });
  }
  insert() {
    this.dialog.open(PaymentMethodInsertComponent, {
      width: '450px',
      data: { parent: this }
    });
  }
  edit(paymentMethodId: any) {
    this.dialog.open(PaymentMethodInsertComponent, {
      width: '450px',
      data: { parent: this, paymentmethod: paymentMethodId }
    });
  }
  delete(id: number) {
    if (confirm('Bạn chọn xóa phương thức thanh toán này không ?')) {
      this.paymentmethodService.delete(id).subscribe((res: ResponseApi) => {
        this.paging();
      });
    }
  }
}
