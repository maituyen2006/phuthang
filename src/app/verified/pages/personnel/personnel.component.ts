import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSnackBar, MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AdminService } from 'src/app/service/admin.service';
import { AdminInsertComponent } from '../../dialog/admin-insert/admin-insert.component';
import * as XLSX from 'xlsx';
import { ResponseApi } from 'src/app/class/response-api';
import { Admin } from 'src/app/class/admin';
import { getColumnWidth } from 'src/app/verified/dialog/xlsx-utils';
import { ConfirmComponent } from '../../dialog/confirm/confirm.component';


@Component({
  selector: 'app-default',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.scss']
})
export class PersonnelComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['adminCode', 'name', 'username', 'identityCard',
    'phone', 'isActive', 'Action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  workingTeams;
  workingTeamID;
  dataSource: MatTableDataSource<Admin> = new MatTableDataSource();
  tempDatasource;
  constructor(private adminService: AdminService, private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

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

  paging() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (item: any, property) => {
      switch (property) {
        case 'name': {
          return item.lastName;
        }
        case 'departmentID': {
          return item.departmentID ? item.departmentID.name : item.departmentID;
        }
        case 'positionAdminID': {
          return item.positionAdminID ? item.positionAdminID.name : item.positionAdminID;
        }
        default: return item[property];
      }
    };
    this.dataSource.sort = this.sort;
    this.adminService.paging().subscribe((res: ResponseApi) => {
      this.dataSource.data = res.data;
      this.tempDatasource = res.data;
    });
  }
  changeWorkingTeam(workingTeam: any) {
    if (typeof workingTeam === 'undefined') {
      this.dataSource.data = this.tempDatasource;
    } else {
      this.dataSource.data = this.tempDatasource.filter((data: any) => {
        return (data.workingTeamID && data.workingTeamID.id === workingTeam.id);
      });
    }
  }
  insert() {
    this.dialog.open(AdminInsertComponent, {
      width: '600px',
      data: { parent: this }
    });
  }
  edit(adminSelected: any) {
    this.dialog.open(AdminInsertComponent, {
      width: '600px',
      data: { parent: this, admin: adminSelected }
    });
  }
  block(id: number) {
    this.adminService.block(id).subscribe((res: ResponseApi) => {
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
  delete(id: number) {
    if (confirm('Bạn chọn xóa nhân viên. Bạn muốn tiếp tục?')) {
      this.adminService.delete(id).subscribe((res: ResponseApi) => {
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
  exportAsExcel() {
    let index = 1;
    const excelData = [];
    for (const admin of this.dataSource.data) {
      const excelProduct = {};
      excelProduct['Mã chấm công'] = admin.adminCode;
      excelProduct[' Tên '] = admin[' name '];
      excelProduct['Tên đăng nhập'] = admin[' username '];
      excelProduct['Phòng ban'] = admin[' departmentID'] ? admin[' departmentID'][' name'] : '';
      excelProduct['Chức vụ'] = admin[' positionAdminID'] ? admin[' positionAdminID'][' name'] : '';
      excelProduct['Trạng thái'] = admin[' isActive'] ? 'Mở khóa' : 'Khóa';
      excelData.push(excelProduct);
      index++;
    }
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelData);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = { Sheets: { data: worksheet }, SheetNames: ['data'], Custprops: { size: 160 } };
    worksheet["!cols"] = getColumnWidth(excelData);
    XLSX.utils.book_append_sheet(wb, worksheet, 'Danh sách nhân viên');
    /* save to file */
    XLSX.writeFile(wb, 'Danh sách nhân viên.xlsx');
  }
  importTemplate() {
    this.adminService.templateImporting().subscribe(
      res => {
        const url = window.URL.createObjectURL(new Blob([res]));
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = url;
        a.download = 'Mẫu import nhân viên.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove(); // remove the element
        // window.open(window.URL.createObjectURL(data));
      });
  }
  handleFileInput($target) {
    const files = $target.files;
    if (files && files.length) {
      const formData = new FormData();
      formData.append('importedFile', files.item(0));
      this.adminService.importAdmins(formData).subscribe((res: ResponseApi) => {
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
        $target.value = '';
        this.paging();
      });
    }
  }
}
