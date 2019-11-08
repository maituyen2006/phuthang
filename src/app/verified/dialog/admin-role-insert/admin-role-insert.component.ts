import { Component, OnInit, Inject } from '@angular/core';
import { AdminRole } from 'src/app/class/admin-role';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AdminRoleService } from 'src/app/service/admin-role.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { RolesComponent } from '../../pages/roles/roles.component';
import { removeUnicode } from 'src/app/utils/string-utils';

@Component({
  selector: 'app-admin-role-insert',
  templateUrl: './admin-role-insert.component.html',
  styleUrls: ['./admin-role-insert.component.scss']
})
export class AdminRoleInsertComponent implements OnInit {
  role: AdminRole = new AdminRole();
  result: boolean = false;
  form: FormGroup = new FormGroup({
    name: new FormControl(this.role.name, [Validators.required]),
    code: new FormControl(this.role.code, [Validators.required]),
    isActive: new FormControl(true)
  });
  get name() {
    return this.form.get('name');
  }
  get code() {
    return this.form.get('code');
  }
  get isActive() {
    return this.form.get('isActive');
  }
  constructor(private adminRoleService: AdminRoleService,
    public dialogRef: MatDialogRef<AdminRoleInsertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.name.valueChanges.subscribe(value => {
      this.code.setValue(removeUnicode(value).replace(/ /g, ''));
    });
  }
  getErrorMessage(input: any) {
    switch (input) {
      case this.name:
        return this.name.hasError('required') ? 'Vui lòng nhập trường này' : '';
      case this.code:
        return this.code.hasError('required') ? 'Vui lòng nhập trường này' : '';
      default:
        return 'Có lỗi';
    }
  }
  onSubmit(form: FormGroup): void {
    if (form.invalid) {
      return;
    }
    let formData = this.form.value;
    formData.parentId = this.data['parentID'];
    this.adminRoleService.insert(formData).subscribe(res => {
      let parent: RolesComponent = this.data['parent'] as RolesComponent;
      if (res["success"]) {
        this.snackBar.open(res["message"], 'Đóng', {
          panelClass: ['style-success'],
          duration: 2500
        });
      } else {
        this.snackBar.open(res["message"], 'Đóng', {
          panelClass: ['style-error'],
          duration: 2500
        });
      }
      parent.paging();
    });
  }

}
