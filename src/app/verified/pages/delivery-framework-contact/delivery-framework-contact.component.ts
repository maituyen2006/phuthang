//Trương Xuân Hiếu
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { DeliveryFrameworkContact } from 'src/app/class/delivery-framework-contact';
import { DeliveryFrameworkContactService } from 'src/app/service/delivery-framework-contact.service';
import { ResponseApi } from 'src/app/class/response-api';
import { DeliveryFrameworkContactInsertComponent } from '../../dialog/delivery-framework-contact-insert/delivery-framework-contact-insert.component';

@Component({
  selector: 'app-delivery-framework-contact',
  templateUrl: './delivery-framework-contact.component.html',
  styleUrls: ['./delivery-framework-contact.component.scss']
})
export class DeliveryFrameworkContactComponent implements OnInit {
  displayedColumns: string[] =['deliveryFrameworkContactId','name','Action']

  dataSource: MatTableDataSource<DeliveryFrameworkContact> = new MatTableDataSource();

  constructor(private deliveryFrameworkContactService: DeliveryFrameworkContactService, private dialog: MatDialog,  private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.paging();
  }
  paging(){
    this.deliveryFrameworkContactService.paging().subscribe((res: ResponseApi ) => {
      this.dataSource.data = res.data;

    })
  }
  insert(){
    this.dialog.open(DeliveryFrameworkContactInsertComponent,{
      width: '600px',
      data: { parent: this}
    });
  }
  edit(credit: DeliveryFrameworkContact) {
    this.dialog.open(DeliveryFrameworkContactInsertComponent, {
      width: '600px',
      data: { parent: this,deliveryFrameworkContactedit: credit }
    });
  }

  delete(deliveryFrameworkContactId: number) {
    if (confirm('Bạn chọn xóa liên hệ khung giao hàng. Bạn muốn tiếp tục?')) {
      this.deliveryFrameworkContactService.delete(deliveryFrameworkContactId).subscribe((res: ResponseApi) => {
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



