import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from 'src/app/service/admin.service';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HeaderComponent } from '../../layout/header/header.component';
import { ResponseApi } from 'src/app/class/response-api';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  form: FormGroup = new FormGroup({
    oldpass: new FormControl('', [Validators.required]),
    newpass: new FormControl('', [Validators.required]),
    checkpass: new FormControl('', [Validators.required]),
  });
  get oldpass() {
    return this.form.get('oldpass');
  }
  get newpass() {
    return this.form.get('newpass');
  }
  get checkpass() {
    return this.form.get('checkpass');
  }

  constructor(private adminService: AdminService,
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  getErrorMessage(input: any) {
    return 'Vui lòng nhập trường này';
  }

  onSubmit(form: FormGroup): void {
    if (form.invalid) {
      return;
    }
    if (this.newpass.value === this.checkpass.value) {
      const formData = this.form.value;
      formData.parentId = this.data.parentID;
      const parent = this.data.parent as HeaderComponent;
      this.adminService.changePassword(formData).subscribe((res: ResponseApi) => {
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
        parent.logout();
      });
    }
  }
}
