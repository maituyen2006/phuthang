import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Transactions } from 'src/app/class/transactions';
import { TransactionsService } from '../../../service/transactions.service';
import { TransactionsComponent } from 'src/app/verified/pages/transactions/transactions.component';
import { Md5 } from 'ts-md5';
import { ResponseApi } from 'src/app/class/response-api';
import { from } from 'rxjs';


@Component({
  selector: 'app-transactions-insert',
  templateUrl: './transactions-insert.component.html',
  styleUrls: ['./transactions-insert.component.scss']
})
export class TransactionsInsertComponent implements OnInit {
  transactions:Transactions =new Transactions();
  isEdit: boolean;
  result = false;
  form: FormGroup;
  get transactionId() {
    return this.form.get('transactionId');
  }
  get name() {
    return this.form.get('name');
  }
  get amount(){
    return this.form.get('amount');
  }
  constructor(private transactionsService:TransactionsService,public dialogRef: MatDialogRef<TransactionsInsertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar) { }

  ngOnInit() {
    if (this.data['transactions']) {
      this.transactions = this.data['transactions'];
      this.isEdit = true;
      this.form = new FormGroup({
        transactionId: new FormControl(this.transactions.transactionId),
        name: new FormControl(this.transactions.name, [Validators.required]),
        amount: new FormControl(this.transactions.amount, [Validators.required]),
      });
    } else {
      this.form = new FormGroup({
        name: new FormControl(this.transactions.name, [Validators.required]),
        amount: new FormControl(this.transactions.amount, [Validators.required]),
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
      this.transactionsService.edit(formData).subscribe((res: ResponseApi) => {
        const parent: TransactionsComponent = this.data['parent'] as TransactionsComponent;
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
      this.transactionsService.insert(formData).subscribe((res: ResponseApi) => {
        const parent: TransactionsComponent = this.data['parent'] as TransactionsComponent;
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
