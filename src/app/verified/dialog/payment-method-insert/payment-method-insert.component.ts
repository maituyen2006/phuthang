import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { PaymentMethod } from 'src/app/class/payment-method';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { PaymentMethodService } from 'src/app/service/payment-method.service';
import { PaymentMethodComponent } from '../../pages/payment-method/payment-method.component';
import { Md5 } from 'ts-md5';
import { ResponseApi } from 'src/app/class/response-api';
import { startWith, map } from 'rxjs/operators';
import { Transactions } from 'src/app/class/transactions';
import { TransactionsService } from 'src/app/service/transactions.service';

@Component({
  selector: 'app-payment-method-insert',
  templateUrl: './payment-method-insert.component.html',
  styleUrls: ['./payment-method-insert.component.scss']
})
export class PaymentMethodInsertComponent implements OnInit {
  paymentmethod: PaymentMethod = new PaymentMethod();
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
  get comments() {
    return this.form.get('comments');
  }
  get transactionId() {
    return this.form.get('transactionId');
  }

  constructor(private paymentmethodservice: PaymentMethodService,
    private transactionService: TransactionsService,
    public dialogRef: MatDialogRef<PaymentMethodInsertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    if (this.data['paymentmethod']) {
      this.paymentmethod = this.data['paymentmethod'];
      this.isEdit = true;
      this.form = new FormGroup({
        paymentMethodId: new FormControl(this.paymentmethod.paymentMethodId, [Validators.required]),
        createdBy: new FormControl(this.paymentmethod.createdBy, [Validators.required]),
        modifiedBy: new FormControl(this.paymentmethod.modifiedBy, [Validators.required]),
        importSequenceNumber: new FormControl(this.paymentmethod.importSequenceNumber),
        versionNumber: new FormControl(this.paymentmethod.versionNumber),
        name: new FormControl(this.paymentmethod.name, [Validators.required]),
        comments: new FormControl(this.paymentmethod.comments, [Validators.required]),
        transactionId: new FormControl(this.paymentmethod.transactionId, [Validators.required]),
      });
    } else {
      this.form = new FormGroup({
        createdBy: new FormControl(null, [Validators.required]),
        modifiedBy: new FormControl(null, [Validators.required]),
        importSequenceNumber: new FormControl(null),
        versionNumber: new FormControl(0),
        name: new FormControl(null, [Validators.required]),
        comments: new FormControl(null, [Validators.required]),
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
      console.log(this.paymentmethod)
      if (this.isEdit) {
        this.transactionId.setValue(this.transactions.find(value => this.paymentmethod.transactionId.transactionId === value.transactionId));
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
      this.paymentmethodservice.edit(formData).subscribe((res: ResponseApi) => {
        const parent: PaymentMethodComponent = this.data['parent'] as PaymentMethodComponent;
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
      this.paymentmethodservice.insert(formData).subscribe((res: ResponseApi) => {
        const parent: PaymentMethodComponent = this.data['parent'] as PaymentMethodComponent;
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



