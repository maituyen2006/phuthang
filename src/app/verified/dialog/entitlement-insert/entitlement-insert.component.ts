import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Entitlement} from 'src/app/class/entitlement';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { PersonnelComponent } from '../../pages/personnel/personnel.component';
import { EntitlementService } from 'src/app/service/entitlement.service';
import { Md5 } from 'ts-md5';
import { ResponseApi } from 'src/app/class/response-api';
import { CompanyService } from 'src/app/service/company.service';
import { startWith, map } from 'rxjs/operators';
import { EntitlementComponent } from '../../pages/entitlement/entitlement.component';

@Component({
  selector: 'app-entitlement-insert',
  templateUrl: './entitlement-insert.component.html',
  styleUrls: ['./entitlement-insert.component.scss']
})
export class EntitlementInsertComponent implements OnInit {
  entitlement: Entitlement = new Entitlement();
  isEdit: boolean;
  filteredWorkingTeam;

  form: FormGroup;
  get entitlementId() {
    return this.form.get('entitlementId');
  }
  get name() {
    return this.form.get('name');
  }
  get createdBy() {
    return this.form.get('createdBy');
  }
  constructor(private entitlementService: EntitlementService,

              public dialogRef: MatDialogRef<EntitlementInsertComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar) {
  }

  ngOnInit() {

    if (this.data.entitlement) {
      this.entitlement = this.data.entitlement;
      this.isEdit = true;
      this.form = new FormGroup({
        entitlementId: new FormControl(this.entitlement.entitlementId, [Validators.required]),
        name: new FormControl(this.entitlement.name, [Validators.required]),
        createdBy: new FormControl(this.entitlement.createdBy),
      });
    } else {
      this.form = new FormGroup({
        name: new FormControl(null, [Validators.required]),
        createdBy: new FormControl(null),

      });
    }
  }
  getErrorMessage() {
    return 'Vui lòng nhập trường này';
  }
  onSubmit(form: FormGroup): void {
    if (form.invalid) {
      return;
    }
    const formData = this.form.value;
    if (this.isEdit) {
      this.entitlementService.edit(formData).subscribe((res: ResponseApi) => {
        const parent: PersonnelComponent = this.data['parent'] as PersonnelComponent;
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
      this.entitlementService.insert(formData).subscribe((res: ResponseApi) => {
        const parent: PersonnelComponent = this.data['parent'] as PersonnelComponent;
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
