import { Component, OnInit } from '@angular/core';
import { AdminService } from '../service/admin.service';
import { Md5 } from 'ts-md5/dist/md5';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { ResponseApi } from '../class/response-api';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  username: string;
  password: string;

  constructor(private imageService: AdminService, private router: Router, private snackBar: MatSnackBar,
    private route: ActivatedRoute) { }

  ngOnInit() {
  }

  login(event: any) {
    this.preventDefault(event);
    if (!this.username || !this.password) {
      alert('Tên đăng nhập hoặc mật khẩu không được để trống');
      return;
    }
    const formData = new FormData();
    const md5 = new Md5();
    formData.append('username', this.username);
    formData.append('password', md5.appendStr(this.password).end().toString());
    this.imageService.login(formData).subscribe((res: ResponseApi) => {
      if (res.success) {
        if (res.data.adminRoleID && res.data.adminRoleID.moduleUrls) {
          res.data.moduleUrls = res.data.adminRoleID.moduleUrls.split(',');
        }
        res.data.moduleUrls.push('/default');
        localStorage.setItem('CURRENT_ADMIN', JSON.stringify(res.data));
        this.snackBar.open(res.message, 'Đóng', {
          panelClass: ['style-success'],
          duration: 2500
        });
        this.route.queryParams.subscribe(params => {
          const returnUrl = params['returnUrl'];
          if (returnUrl) {
            this.router.navigate([returnUrl]);
          } else {
            this.router.navigate(['/verified']);
          }
        });
      } else {
        this.snackBar.open(res.message, 'Đóng', {
          panelClass: ['style-error'],
          duration: 2500
        });
      }
    });
  }
  preventDefault(event: any) {
    event.preventDefault();
  }
}
