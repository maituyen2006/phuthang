import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ChangePasswordComponent } from '../../dialog/change-password/change-password.component';
import { AdminModuleService } from 'src/app/service/admin-module.service';
import { ResponseApi } from 'src/app/class/response-api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  modules = [];

  admin;
  navbarOpen = false;
  constructor(private adminService: AdminModuleService, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    this.admin = JSON.parse(localStorage.CURRENT_ADMIN);
    this.adminService.getAllModuleOfUser().subscribe((res: ResponseApi) => {
      this.modules = res.data;
    });
  }

  filterModuleByParentId(parentID: number) {
    const result = this.modules.filter(item => item.parentID === parentID).sort((a: any, b: any) => {
      if (a.orderNumber > b.orderNumber) {
        return -1;
      }
      if (a.orderNumber < b.orderNumber) {
        return 1;
      }
      return 0;
    });
    return result;
  }
  hasChildren(parentID: number) {
    return this.modules.find(item => item.parentID === parentID) ? true : false;
  }
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  logout() {
    localStorage.removeItem('CURRENT_ADMIN');
    this.router.navigate(['/auth']);
  }

  changePassword() {
    this.dialog.open(ChangePasswordComponent, {
      width: '400px',
      data: { parent: this }
    });
  }
}
