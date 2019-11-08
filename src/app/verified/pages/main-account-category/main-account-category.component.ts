//Trương Xuân Hiếu
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { MainAccountCategory } from 'src/app/class/main-account-category';
import { MainAccountCategoryService } from 'src/app/service/main-account-category.service';
import { ResponseApi } from 'src/app/class/response-api';
import { MainAccountCategoryInsertComponent } from '../../dialog/main-account-category-insert/main-account-category-insert.component';

@Component({
  selector: 'app-main-account-category',
  templateUrl: './main-account-category.component.html',
  styleUrls: ['./main-account-category.component.scss']
})
export class MainAccountCategoryComponent implements OnInit {
  displayedColumns: string[]=['mainAccountCategoryId','name','description','Action']
  dataSource = new MatTableDataSource<MainAccountCategory> ();

  constructor(private mainAccountCategoryService: MainAccountCategoryService,private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
    this.paging();
  }
  paging(){
    this.mainAccountCategoryService.paging().subscribe((res: ResponseApi ) => {
      this.dataSource.data = res.data;

    })
  }
  insert(){
    this.dialog.open(MainAccountCategoryInsertComponent,{
      width: '600px',
      data: { parent: this}
    });
  }
  edit(credit: MainAccountCategory) {
    this.dialog.open(MainAccountCategoryInsertComponent, {
      width: '600px',
      data: { parent: this, mainaccount: credit }
    });
  }

  delete(mainAccountCategoryId: number) {
    if (confirm('Bạn chọn xóa người nhân  gói tín dụng. Bạn muốn tiếp tục?')) {
      this.mainAccountCategoryService.delete(mainAccountCategoryId).subscribe((res: ResponseApi) => {
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
