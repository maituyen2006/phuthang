import { Component, OnInit,Inject } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ResponseApi } from 'src/app/class/response-api';
import { Designation } from 'src/app/class/designation';
import { DesignationService } from 'src/app/service/designation.service';
import { DesignationComponent } from '../../pages/designation/designation.component';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-designation-insert',
  templateUrl: './designation-insert.component.html',
  styleUrls: ['./designation-insert.component.scss']
})
export class DesignationInsertComponent implements OnInit {
  admin: Designation = new Designation();
  companys = [];
  isEdit: boolean;
  result = false;
  showPassword = true;
  filteredWorkingTeam;

  form: FormGroup;
  get designationId() {
    return this.form.get('designationId');
  }
  get createdBy() {
    return this.form.get('createdBy');
  }

  constructor(private designationService: DesignationService,
    
    public dialogRef: MatDialogRef<DesignationInsertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar) { }

  ngOnInit() {
    if (this.data['designation']) {
      this.admin = this.data['designation'];
      this.isEdit = true;
      this.form = new FormGroup({
        designationId: new FormControl(this.admin.designationId, [Validators.required]),
        createdBy: new FormControl(this.admin.createdBy),
        
      });
    } else {
      this.form = new FormGroup({
        createdBy: new FormControl(this.admin.createdBy),
 
      });
    }
  }
  getErrorMessage(input: any) {
    return 'Vui lòng nhập trường này';
  }
  onSubmit(form: FormGroup): void {
    if (form.invalid) {
      return;
    }
    const formData = this.form.value;
    if (this.isEdit) {
      this.designationService.edit(formData).subscribe((res: ResponseApi) => {
        const parent: DesignationComponent = this.data['parent'] as DesignationComponent;
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
        parent.paging();
      });
    } else {
      if (formData['password']) {
        formData['password'] = new Md5().appendStr(formData['password']).end();
      }
      this.designationService.insert(formData).subscribe((res: ResponseApi) => {
        const parent: DesignationComponent = this.data['parent'] as DesignationComponent;
        if (res.success) {
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


}
