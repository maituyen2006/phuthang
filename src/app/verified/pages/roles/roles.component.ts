import { Component, OnInit } from '@angular/core';
import { Pager } from 'src/app/class/pager';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AdminRoleService } from 'src/app/service/admin-role.service';
import { AdminRoleInsertComponent } from '../../dialog/admin-role-insert/admin-role-insert.component';
import { AdminRolePermissionComponent } from '../../dialog/admin-role-permission/admin-role-permission.component';
import { AdminRole } from 'src/app/class/admin-role';
import { ConfirmComponent } from '../../dialog/confirm/confirm.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'code', 'isActive', 'Action'];
  dataSource = [];
  pager: Pager = new Pager();
  constructor(private roleService: AdminRoleService, private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.paging();
  }
  paging() {
    this.roleService.paging(this.pager).subscribe(data => {
      let pagingData = data['data'];
      this.pager = pagingData["pager"];
      this.dataSource = pagingData["items"];
    });
  }
  reloadPaging(event: any) {
    this.pager.currentPage = event.pageIndex + 1;
    this.pager.displayPerPage = event.pageSize;
    this.paging();
  }
  insert() {
    this.dialog.open(AdminRoleInsertComponent, {
      width: '400px',
      data: { parent: this }
    });
  }
  permission(role: AdminRole) {
    this.dialog.open(AdminRolePermissionComponent, {
      width: '600px',
      data: { parent: this, role: role }
    });
  }
  edit(id: number) {
    alert(id);
  }
  block(id: number) {
    this.roleService.block(id).subscribe(data => {
      this.paging();
      if (data["success"]) {
        this.snackBar.open(data["message"], 'Đóng', {
          panelClass: ['style-success'],
          duration: 2500
        });
      } else {
        this.snackBar.open(data["message"], 'Đóng', {
          panelClass: ['style-error'],
          duration: 2500
        });
      }
    });
  }
  delete(id: number) {
    if (confirm('Bạn chọn xóa quyền. Bạn muốn tiếp tục?')) {
      this.roleService.delete(id).subscribe(data => {
        this.paging();
        if (data["success"]) {
          this.snackBar.open(data["message"], 'Đóng', {
            panelClass: ['style-success'],
            duration: 2500
          });
        } else {
          this.snackBar.open(data["message"], 'Đóng', {
            panelClass: ['style-error'],
            duration: 2500
          });
        }
      });
    }
  }

}
