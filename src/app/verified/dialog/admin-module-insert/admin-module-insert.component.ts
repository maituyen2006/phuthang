import { Component, OnInit, Inject } from '@angular/core';
import { AdminModule } from 'src/app/class/admin-module';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminModuleService } from 'src/app/service/admin-module.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ModuleComponent } from '../../pages/module/module.component';

@Component({
  selector: 'app-admin-module-insert',
  templateUrl: './admin-module-insert.component.html',
  styleUrls: ['./admin-module-insert.component.scss']
})
export class AdminModuleInsertComponent implements OnInit {
  module: AdminModule = new AdminModule();
  result: boolean = false;
  isEdit: boolean;
  form: FormGroup;
  get name() {
    return this.form.get('name');
  }
  get routeLink() {
    return this.form.get('routeLink');
  }
  get icon() {
    return this.form.get('icon');
  }
  get orderNumber() {
    return this.form.get('orderNumber');
  }
  get isShow() {
    return this.form.get('isShow');
  }
  constructor(private adminModuleService: AdminModuleService,
    public dialogRef: MatDialogRef<AdminModuleInsertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.isEdit = this.data['isEdit'];
    if (this.isEdit) {
      this.module = this.data['module'];
      this.form = new FormGroup({
        id: new FormControl(this.module.id),
        name: new FormControl(this.module.name, [Validators.required]),
        routeLink: new FormControl(this.module.routeLink),
        icon: new FormControl(this.module.icon),
        orderNumber: new FormControl(this.module.orderNumber),
        isShow: new FormControl(true)
      })
    } else {
      this.form = new FormGroup({
        name: new FormControl(this.module.name, [Validators.required]),
        routeLink: new FormControl(this.module.routeLink),
        icon: new FormControl(this.module.icon),
        orderNumber: new FormControl(this.module.orderNumber),
        isShow: new FormControl(true)
      })
    }
  }
  getErrorMessage() {
    return this.name.hasError('required') ? 'Vui lòng nhập trường này' : '';
  }
  onSubmit(form: FormGroup): void {
    if (form.invalid) {
      return;
    }
    let formData = this.form.value;
    if (this.isEdit) {
      this.adminModuleService.edit(formData).subscribe(res => {
        let parent: ModuleComponent = this.data['parent'] as ModuleComponent;
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
        parent.reload();
      });
    } else {
      formData.parentId = this.data['parentID'];
      this.adminModuleService.insert(formData).subscribe(res => {
        let parent: ModuleComponent = this.data['parent'] as ModuleComponent;
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
        parent.reload();
      });
    }
  }
}
