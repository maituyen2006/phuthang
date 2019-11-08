import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Ledger } from 'src/app/class/ledger';
import { LedgerService } from 'src/app/service/ledger.service';
import { LedgerComponent } from 'src/app/verified/pages/ledger/ledger.component';
import { Md5 } from 'ts-md5';
import { ResponseApi } from 'src/app/class/response-api';
import { from } from 'rxjs';
@Component({
  selector: 'app-ledger-insert',
  templateUrl: './ledger-insert.component.html',
  styleUrls: ['./ledger-insert.component.scss']
})
export class LedgerInsertComponent implements OnInit {
  ledger:Ledger =new Ledger();
  isEdit: boolean;
  result = false;
  form: FormGroup;
  get ledgerId() {
    return this.form.get('ledgerId');
  }
  get name() {
    return this.form.get('name');
  }
  get description(){
    return this.form.get('description');
  }
  constructor(private ledgerService:LedgerService,public dialogRef: MatDialogRef<LedgerInsertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar) { }

  ngOnInit() {
    if (this.data['ledger']) {
      this.ledger = this.data['ledger'];
      this.isEdit = true;
      this.form = new FormGroup({
        ledgerId: new FormControl(this.ledger.ledgerId),
        name: new FormControl(this.ledger.name, [Validators.required]),
        description: new FormControl(this.ledger.description, [Validators.required]),
      });
    } else {
      this.form = new FormGroup({
        name: new FormControl(this.ledger.name, [Validators.required]),
        description: new FormControl(this.ledger.description, [Validators.required]),
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
      this.ledgerService.edit(formData).subscribe((res: ResponseApi) => {
        const parent: LedgerComponent = this.data['parent'] as LedgerComponent;
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
      this.ledgerService.insert(formData).subscribe((res: ResponseApi) => {
        const parent: LedgerComponent = this.data['parent'] as LedgerComponent;
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
