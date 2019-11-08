//Trương Xuân Hiếu
import { Component, OnInit, ViewChild } from '@angular/core';
import{CreditPlanRecipient} from '../../../class/credit-plan-recipient';
import{CreditPlanRecipientService} from 'src/app/service/credit-plan-recipient.service';
import { from } from 'rxjs';
import {MatSnackBar, MatTableDataSource, MatDialog,MatSort,MatPaginator } from '@angular/material';
import { ResponseApi } from 'src/app/class/response-api';
import { CreditPlanReceiptInsertComponent } from '../../dialog/credit-plan-receipt-insert/credit-plan-receipt-insert.component';
@Component({
  selector: 'app-credit-plan-recipient',
  templateUrl: './credit-plan-recipient.component.html',
  styleUrls: ['./credit-plan-recipient.component.scss']
})
export class CreditPlanRecipientComponent implements OnInit {
 displayedColumns: string[]=['creditRecipientId','createdOn','createdBy','createdOnBehalfBy','name','overriddenCreatedOn','importSequenceNumber','Action']
 @ViewChild(MatPaginator) paginator: MatPaginator;
 @ViewChild(MatSort) sort: MatSort;
 dataSource = new MatTableDataSource<CreditPlanRecipient> ();

  constructor(private creditPlanRecipientService: CreditPlanRecipientService, private snackBar: MatSnackBar,
    private dialog:MatDialog ) { }
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
      this.creditPlanRecipientService.paging().subscribe((res: ResponseApi ) => {
        this.dataSource.data = res.data;

      })
    }
    insert(){
      this.dialog.open(CreditPlanReceiptInsertComponent,{
        width: '90vw',
        maxHeight:'90vh',
        data: { parent: this}
      });
    }
    edit(credit: CreditPlanRecipient) {
      this.dialog.open(CreditPlanReceiptInsertComponent, {
        width: '90vw',
        maxHeight:'90vh',
        data: { parent: this, creditplan: credit }
      });
    }

    delete(creditRecipientId: number) {
      if (confirm('Bạn chọn xóa người nhân  gói tín dụng. Bạn muốn tiếp tục?')) {
        this.creditPlanRecipientService.delete(creditRecipientId).subscribe((res: ResponseApi) => {
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
