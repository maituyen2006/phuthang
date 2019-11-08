import { Component, OnInit } from '@angular/core';
import { AdminModuleService } from 'src/app/service/admin-module.service';
import { ResponseApi } from 'src/app/class/response-api';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  constructor(private adminService: AdminModuleService) { }

  ngOnInit() {
  }
}
