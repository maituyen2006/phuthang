import { Component, OnInit } from '@angular/core';
import {PaymentSchedule} from '../../../class/payment-schedule';
import { ResponseApi } from 'src/app/class/response-api';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { PaymentScheduleService } from 'src/app/service/payment-schedule.service';
import { PaymentScheduleInsertComponent } from '../../dialog/payment-schedule-insert/payment-schedule-insert.component';
import { from } from 'rxjs';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-payment-schedule',
  templateUrl: './payment-schedule.component.html',
  styleUrls: ['./payment-schedule.component.scss']
})
export class PaymentScheduleComponent implements OnInit {
  displayedColumns: string[]=['paymentScheduleId','createdBy','modifiedBy','importSequenceNumber','versionNumber', 'name', 'Action']
  dataSource = new MatTableDataSource<PaymentSchedule>();
  constructor(private paymentscheduleService: PaymentScheduleService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.paging();
  }
  paging(){
    this.paymentscheduleService.paging().subscribe((res: ResponseApi ) => {
      this.dataSource.data = res.data;
    });
  }
  insert() {
    this.dialog.open(PaymentScheduleInsertComponent, {
      width: '90vw',
      maxHeight: '90vh',
      data: { parent: this }
    });
  }
  edit(paymentScheduleId: any) {
    this.dialog.open(PaymentScheduleInsertComponent, {
      width: '90vw',
      maxHeight: '90vh',
      data: { parent: this, paymentschedule: paymentScheduleId }
    });
  }
  delete(id: number) {
    if (confirm('Bạn chọn xóa lịch trình thanh toán này không ?')) {
      this.paymentscheduleService.delete(id).subscribe((res: ResponseApi) => {
        this.paging();
      });
    }
  }
}
