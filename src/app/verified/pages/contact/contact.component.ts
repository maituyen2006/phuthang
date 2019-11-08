import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/class/contact';
import { ResponseApi } from 'src/app/class/response-api';
import { MatSnackBar, MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { from } from 'rxjs';
import { ContactService } from 'src/app/service/contact.service';
import { ContactInsertComponent } from 'src/app/verified/dialog/contact-insert/contact-insert.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  displayedColumns: string[] =['contactId','fullname','telephone1','createdBy','Action'];

  dataSource: MatTableDataSource<Account> = new MatTableDataSource();

  constructor(private contactService: ContactService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.paging();
  }
  paging(){
    this.contactService.paging().subscribe((res: ResponseApi ) => {
      this.dataSource.data = res.data;
      
    })
  }
  insert(){
    this.dialog.open(ContactInsertComponent,{
      width: '600px',
      data: { parent: this}
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  delete(contactId:number){
    if (confirm('Bạn chọn xóa nhân viên. Bạn muốn tiếp tục?')) {
      this.contactService.delete(contactId).subscribe((res: ResponseApi) => {
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
  edit(accountSelected: any) {
    this.dialog.open(ContactInsertComponent, {
      width: '600px',
      data: { parent: this, invoi: accountSelected }
    });
  }

}
