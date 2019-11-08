import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ResponseApi } from 'src/app/class/response-api';
import { startWith, map } from 'rxjs/operators';
import { Md5 } from 'ts-md5';
import { PaymentProcessor } from 'src/app/class/payment-processor';
import { PaymentProcessorService } from 'src/app/service/payment-processor.service';
import { PaymentProcessorComponent } from '../../pages/payment-processor/payment-processor.component';

@Component({
  selector: 'app-payment-processor-insert',
  templateUrl: './payment-processor-insert.component.html',
  styleUrls: ['./payment-processor-insert.component.scss']
})
export class PaymentProcessorInsertComponent implements OnInit {
  admin: PaymentProcessor = new PaymentProcessor();
  companys = [];
  isEdit: boolean;
  result = false;
  showPassword = true;
  filteredWorkingTeam;

  
  form: FormGroup;
  get paymentProcessorId() {
    return this.form.get('paymentProcessorId');
  }
  get createdBy() {
    return this.form.get('createdBy');
  }

  constructor(private paymentprocessorService: PaymentProcessorService,
    
    public dialogRef: MatDialogRef<PaymentProcessorInsertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar) { }

  ngOnInit() {
    if (this.data['paymentprocessor']) {
      this.admin = this.data['paymentprocessor'];
      this.isEdit = true;
      this.form = new FormGroup({
        paymentProcessorId: new FormControl(this.admin.paymentProcessorId, [Validators.required]),
        createdBy: new FormControl(this.admin.createdBy),
        
      });
    } else {
      this.form = new FormGroup({
        paymentProcessorId: new FormControl(this.admin.paymentProcessorId, [Validators.required]),
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
      this.paymentprocessorService.edit(formData).subscribe((res: ResponseApi) => {
        const parent: PaymentProcessorComponent = this.data['parent'] as PaymentProcessorComponent;
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
      this.paymentprocessorService.insert(formData).subscribe((res: ResponseApi) => {
        const parent: PaymentProcessorComponent = this.data['parent'] as PaymentProcessorComponent;
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
