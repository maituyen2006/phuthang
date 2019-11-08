import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Admin } from 'src/app/class/admin';
import { Invoice } from 'src/app/class/invoice';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AdminService } from 'src/app/service/admin.service';
import { PersonnelComponent } from '../../pages/personnel/personnel.component';
import { AdminRoleService } from 'src/app/service/admin-role.service';
import { InvoiceService} from '../../../service/invoice.service';
import { InvoiceComponent } from '../../../verified/pages/invoice/invoice.component'
import { Md5 } from 'ts-md5';
import { ResponseApi } from 'src/app/class/response-api';
import { CompanyService } from 'src/app/service/company.service';
import { startWith, map } from 'rxjs/operators';
import { from } from 'rxjs';

@Component({
  selector: 'app-invoice-insert',
  templateUrl: './invoice-insert.component.html',
  styleUrls: ['./invoice-insert.component.scss']
})
export class InvoiceInsertComponent implements OnInit {

  invoice: Invoice = new Invoice();
  adminRoles = [];
  companys = [];
  isEdit: boolean;
  result = false;
  showPassword = true;
  filteredWorkingTeam;

  form: FormGroup;
  get invoiceId() {
    return this.form.get('invoiceId');
  }
  get name() {
    return this.form.get('name');
  }
  get emailAddress(){
    return this.form.get('emailAddress');
  }

  constructor(private adminService: AdminService,
    private companyService: CompanyService, private adminRoleService: AdminRoleService,private invoiceService:InvoiceService,
    public dialogRef: MatDialogRef<InvoiceInsertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    
    if (this.data['invoice']) {
      this.invoice = this.data['invoice'];
      this.isEdit = true;
      this.form = new FormGroup({
        name: new FormControl(this.invoice.name, [Validators.required]),
        emailAddress: new FormControl(this.invoice.emailAddress,[Validators.email]),
      });
    } else {
      this.form = new FormGroup({
        name: new FormControl(this.invoice.name, [Validators.required]),
        emailAddress: new FormControl(this.invoice.emailAddress,[Validators.email]),
      });
    }
    // this.adminRoleService.findAllAvaiable().subscribe(res => {
    //   this.adminRoles = res['data'];
    //   this.adminRoleId.setValue(this.invoiceId.adminRoleId ? this.adminRoles.find(role => {
    //     return this.admin.adminRoleId.id === role.id;
    //   }) : null);
    // });
    // this.invoiceService.findAllAvaiable().subscribe(res => {
    //   this.invoice = res['data'];
    // });
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
      this.invoiceService.edit(formData).subscribe((res: ResponseApi) => {
        const parent: InvoiceComponent = this.data['parent'] as InvoiceComponent;
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
      this.invoiceService.insert(formData).subscribe((res: ResponseApi) => {
        const parent: InvoiceComponent = this.data['parent'] as InvoiceComponent;
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
