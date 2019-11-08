import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { DesignatedCredit } from 'src/app/class/designated-credit';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { DesignatedCreditService } from 'src/app/service/designated-credit.service';
import { DesignatedCreditComponent } from '../../pages/designated-credit/designated-credit.component';
import { Md5 } from 'ts-md5';
import { ResponseApi } from 'src/app/class/response-api';
import { startWith, map } from 'rxjs/operators';
import { Transactions } from 'src/app/class/transactions';
import { TransactionsService } from 'src/app/service/transactions.service';

@Component({
  selector: 'app-designated-credit-insert',
  templateUrl: './designated-credit-insert.component.html',
  styleUrls: ['./designated-credit-insert.component.scss']
})
export class DesignatedCreditInsertComponent implements OnInit {
  designatedCredit: DesignatedCredit = new DesignatedCredit();
  isEdit: boolean;
  result = false;
  transactions: Transactions[] = [];

  form: FormGroup;
  get createdBy() {
    return this.form.get('createdBy');
  }
  get modifiedBy() {
    return this.form.get('modifiedBy');
  }
  get importSequenceNumber() {
    return this.form.get('importSequenceNumber');
  }
  get versionNumber() {
    return this.form.get('versionNumber');
  }
  get name() {
    return this.form.get('name');
  }
  get creditTypedisplay() {
    return this.form.get('creditTypedisplay');
  }
  get transactionId() {
    return this.form.get('transactionId');
  }

  constructor(private designatedCreditservice: DesignatedCreditService,
    private transactionService: TransactionsService,
    public dialogRef: MatDialogRef<DesignatedCreditInsertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    if (this.data['DesignatedCredit']) {
      this.designatedCredit = this.data['DesignatedCredit'];
      this.isEdit = true;
      this.form = new FormGroup({
        designatedCreditId: new FormControl(this.designatedCredit.designatedCreditId, [Validators.required]),
        createdBy: new FormControl(this.designatedCredit.createdBy, [Validators.required]),
        modifiedBy: new FormControl(this.designatedCredit.modifiedBy, [Validators.required]),
        importSequenceNumber: new FormControl(this.designatedCredit.importSequenceNumber),
        versionNumber: new FormControl(this.designatedCredit.versionNumber),
        name: new FormControl(this.designatedCredit.name, [Validators.required]),
        creditTypedisplay: new FormControl(this.designatedCredit.creditTypedisplay, [Validators.required]),
        transactionId: new FormControl(this.designatedCredit.transactionId, [Validators.required]),
      });
    } else {
      this.form = new FormGroup({
        createdBy: new FormControl(null, [Validators.required]),
        modifiedBy: new FormControl(null, [Validators.required]),
        importSequenceNumber: new FormControl(0),
        versionNumber: new FormControl(0),
        name: new FormControl(null, [Validators.required]),
        creditTypedisplay: new FormControl(null, [Validators.required]),
        transactionId: new FormControl(null, [Validators.required]),

        //   });
        // }
        // this.adminRoleService.findAllAvaiable().subscribe(res => {
        //   this.adminRoles = res['data'];
        //   this.adminRoleId.setValue(this.admin.adminRoleId ? this.adminRoles.find(role => {
        //     return this.admin.adminRoleId.id === role.id;
        //   }) : null);
        // });
        // this.companyService.findAllAvaiable().subscribe(res => {
        //   this.companys = res['data'];
        // });
      });
    }
    this.transactionService.paging().subscribe((res: ResponseApi) => {
      this.transactions = res.data;
      console.log(this.designatedCredit)
      if (this.isEdit) {
        this.transactionId.setValue(this.transactions.find(value => this.designatedCredit.transactionId.transactionId === value.transactionId));
      }
    });
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
      this.designatedCreditservice.edit(formData).subscribe((res: ResponseApi) => {
        const parent: DesignatedCreditComponent = this.data['parent'] as DesignatedCreditComponent;
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
      this.designatedCreditservice.insert(formData).subscribe((res: ResponseApi) => {
        const parent: DesignatedCreditComponent = this.data['parent'] as DesignatedCreditComponent;
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



