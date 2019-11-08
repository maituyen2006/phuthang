import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DeliveryFrameworkDescription } from 'src/app/class/delivery-framework-description';
import { MatSnackBar, MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ResponseApi } from 'src/app/class/response-api';
import { DeliveryFrameworkDescriptionService } from '../../../service/delivery-framework-description.service';
import { DeliveryFrameworkDescriptionInsertComponent } from 'src/app/verified/dialog/delivery-framework-description-insert/delivery-framework-description-insert.component';

@Component({
  selector: 'app-delivery-framework-description',
  templateUrl: './delivery-framework-description.component.html',
  styleUrls: ['./delivery-framework-description.component.scss']
})
export class DeliveryFrameworkDescriptionComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] =['deliveryFrameworkDescriptionId','name','createdBy','description','Action'];
  dataSource: MatTableDataSource<DeliveryFrameworkDescription> = new MatTableDataSource();
  constructor(private deliveryFrameworkDescriptionService:DeliveryFrameworkDescriptionService ,private snackBar:MatSnackBar,private dialog: MatDialog) { }


  ngOnInit() {
    this.paging();
  }
  paging(){
    this.deliveryFrameworkDescriptionService.paging().subscribe((res: ResponseApi ) => {
      this.dataSource.data = res.data;
      this.dataSource.sort = this.sort;
      
    })
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  delete(deliveryFrameworkDescriptionId:number){
    if (confirm('Bạn chọn xóa ID này. Bạn muốn tiếp tục?')) {
      this.deliveryFrameworkDescriptionService.delete(deliveryFrameworkDescriptionId).subscribe((res: ResponseApi) => {
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
  insert(){
    this.dialog.open(DeliveryFrameworkDescriptionInsertComponent,{
      width: '90vw',
      maxHeight: '90vh',
      data: { parent: this}
    });
  }
  edit(deliverySelected: any) {
    this.dialog.open(DeliveryFrameworkDescriptionInsertComponent, {
      width: '90vw',
      maxHeight: '90vh',
      data: { parent: this, deliveryFrameworkDescription: deliverySelected }
    });
  }
}
