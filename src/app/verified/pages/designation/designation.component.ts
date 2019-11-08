import { Component, OnInit,ViewChild, } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSnackBar, MatPaginator, MatSort } from '@angular/material';
import {Designation} from '../../../class/designation';
import { DesignationService } from 'src/app/service/designation.service';
import { ResponseApi } from 'src/app/class/response-api';
import { from } from 'rxjs';
import { DesignationInsertComponent } from '../../dialog/designation-insert/designation-insert.component';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.scss']
})
export class DesignationComponent implements OnInit {
  displayedColumns: string[] =['designationId','createdBy','Action']
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource <Designation>();


  constructor(private designationService: DesignationService, private dialog: MatDialog,
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
      this.designationService.paging().subscribe((res: ResponseApi) => {
        this.dataSource.data = res.data;
      })
    
      
    }
    insert(){
      this.dialog.open(DesignationInsertComponent,{
        width: '600px',
        data: { parent: this}
      });
    }
    edit(design: Designation) {
      this.dialog.open(DesignationInsertComponent, {
        width: '600px',
        data: { parent: this, designation: design }
      });
    }
    delete(id: number) {
      if (confirm('Bạn chọn xóa gói tín dụng. Bạn muốn tiếp tục?')) {
        this.designationService.delete(id).subscribe((res: ResponseApi) => {
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
