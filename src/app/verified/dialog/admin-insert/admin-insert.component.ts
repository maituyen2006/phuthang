import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Admin } from 'src/app/class/admin';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AdminService } from 'src/app/service/admin.service';
import { PersonnelComponent } from '../../pages/personnel/personnel.component';
import { AdminRoleService } from 'src/app/service/admin-role.service';
import { Md5 } from 'ts-md5';
import { ResponseApi } from 'src/app/class/response-api';
import { CompanyService } from 'src/app/service/company.service';
import { startWith, map } from 'rxjs/operators';


@Component({
  selector: 'app-admin-insert',
  templateUrl: './admin-insert.component.html',
  styleUrls: ['./admin-insert.component.scss']
})
export class AdminInsertComponent implements OnInit {
  admin: Admin = new Admin();
  adminRoles = [];
  companys = [];
  isEdit: boolean;
  result = false;
  showPassword = true;
  filteredWorkingTeam;

  form: FormGroup;
  get name() {
    return this.form.get('name');
  }
  get isManager() {
    return this.form.get('isManager');
  }
  get username() {
    return this.form.get('username');
  }
  get password() {
    return this.form.get('password');
  }
  get adminCode() {
    return this.form.get('adminCode');
  }
  get adminRoleId() {
    return this.form.get('adminRoleId');
  }
  get companyID() {
    return this.form.get('companyID');
  }
  get gender() {
    return this.form.get('gender');
  }
  get phone() {
    return this.form.get('phone');
  }
  get iNF_PlaceOfBirth() {
    return this.form.get('iNF_PlaceOfBirth');
  }
  get iNF_DateOfBirth() {
    return this.form.get('iNF_DateOfBirth');
  }
  get iNF_Country() {
    return this.form.get('iNF_Country');
  }
  get iNF_Nation() {
    return this.form.get('iNF_Nation');
  }
  get iNF_SourceNation() {
    return this.form.get('iNF_SourceNation');
  }
  get iNF_Address() {
    return this.form.get('iNF_Address');
  }
  get iNF_BankName() {
    return this.form.get('iNF_BankName');
  }
  get iNF_BankAccount() {
    return this.form.get('iNF_BankAccount');
  }
  constructor(private adminService: AdminService,
    private companyService: CompanyService, private adminRoleService: AdminRoleService,
    public dialogRef: MatDialogRef<AdminInsertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    
    if (this.data['admin']) {
      this.admin = this.data['admin'];
      this.isEdit = true;
      this.form = new FormGroup({
        name: new FormControl(this.admin.name, [Validators.required]),
        isManager: new FormControl(this.admin.isManager),
        id: new FormControl(this.admin.id),
        adminRoleId: new FormControl(this.admin.adminRoleId),
        adminCode: new FormControl(this.admin.adminCode, [Validators.required]),
        username: new FormControl({ value: this.admin.username, disabled: true }),
        gender: new FormControl(this.admin.gender),
        phone: new FormControl(this.admin.phone),
        iNF_PlaceOfBirth: new FormControl(this.admin.iNF_PlaceOfBirth),
        iNF_DateOfBirth: new FormControl(this.admin.iNF_DateOfBirth),
        iNF_Country: new FormControl(this.admin.iNF_Country),
        iNF_Nation: new FormControl(this.admin.iNF_Nation),
        iNF_SourceNation: new FormControl(this.admin.iNF_SourceNation),
        iNF_Address: new FormControl(this.admin.iNF_Address),
        iNF_BankName: new FormControl(this.admin.iNF_BankName),
        iNF_BankAccount: new FormControl(this.admin.iNF_BankAccount),
        isActive: new FormControl(this.admin.isActive),
      });
    } else {
      this.form = new FormGroup({
        name: new FormControl(this.admin.name, [Validators.required]),
        isManager: new FormControl(this.admin.isManager),
        username: new FormControl(this.admin.username),
        password: new FormControl(this.admin.password),
        adminCode: new FormControl(this.admin.adminCode, [Validators.required]),
        adminRoleId: new FormControl(this.admin.adminRoleId),
        gender: new FormControl(this.admin.gender),
        phone: new FormControl(this.admin.phone),
        iNF_PlaceOfBirth: new FormControl(this.admin.iNF_PlaceOfBirth),
        iNF_DateOfBirth: new FormControl(this.admin.iNF_DateOfBirth),
        iNF_Country: new FormControl(this.admin.iNF_Country),
        iNF_Nation: new FormControl(this.admin.iNF_Nation),
        iNF_SourceNation: new FormControl(this.admin.iNF_SourceNation),
        iNF_Address: new FormControl(this.admin.iNF_Address),
        iNF_BankName: new FormControl(this.admin.iNF_BankName),
        iNF_BankAccount: new FormControl(this.admin.iNF_BankAccount),
      });
    }
    this.adminRoleService.findAllAvaiable().subscribe(res => {
      this.adminRoles = res['data'];
      this.adminRoleId.setValue(this.admin.adminRoleId ? this.adminRoles.find(role => {
        return this.admin.adminRoleId.id === role.id;
      }) : null);
    });
    this.companyService.findAllAvaiable().subscribe(res => {
      this.companys = res['data'];
    });
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
      this.adminService.edit(formData).subscribe((res: ResponseApi) => {
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
      this.adminService.insert(formData).subscribe((res: ResponseApi) => {
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
