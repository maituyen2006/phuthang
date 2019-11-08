import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { ResponseApi } from 'src/app/class/response-api';
import { Admin } from 'src/app/class/admin';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  admin: Admin = new Admin();
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getInformation().subscribe((res: ResponseApi) => {
      this.admin = res.data;
    });
  }
}
