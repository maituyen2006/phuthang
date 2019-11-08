// Nguyễn Thanh Tùng
import { Component, OnInit, Inject } from '@angular/core';
import { TransactionCategory } from 'src/app/class/transaction-category';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TransactionCategoryService } from 'src/app/service/transaction-category.service';
import { CompanyService } from 'src/app/service/company.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ResponseApi } from 'src/app/class/response-api';
import { TransactionCategoryComponent } from 'src/app/verified/pages/transaction-category/transaction-category.component'
  import { from } from 'rxjs';

@Component({
  selector: 'app-transaction-category-insert',
  templateUrl: './transaction-category-insert.component.html',
  styleUrls: ['./transaction-category-insert.component.scss']
})
export class TransactionCategoryInsertComponent implements OnInit {
  form: FormGroup;
  transactionCategory: TransactionCategory = new TransactionCategory();
  isEdit: boolean;
  get transactionCategoryId() {
    return this.form.get('transactionCategoryId');
  }
  get createdBy() {
    return this.form.get('createdBy');
  }

  constructor(private transactionCategoryService: TransactionCategoryService,
    private companyService: CompanyService,
    public dialogRef: MatDialogRef<TransactionCategoryInsertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar) {
  }

  ngOnInit() {

    if (this.data['transactionCategory']) {
      this.transactionCategory = this.data['transactionCategory'];
      this.isEdit = true;
      this.form = new FormGroup({
        transactionCategoryId: new FormControl(this.transactionCategory.transactionCategoryId, [Validators.required]),
        createdBy: new FormControl(this.transactionCategory.createdBy),
      });
    } else {
      this.form = new FormGroup({
        transactionCategoryId: new FormControl(this.transactionCategory.transactionCategoryId, [Validators.required]),
        createdBy: new FormControl(this.transactionCategory.createdBy),
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
      this.transactionCategoryService.edit(formData).subscribe((res: ResponseApi) => {
        const parent: TransactionCategoryComponent = this.data['parent'] as TransactionCategoryComponent;
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
      this.transactionCategoryService.insert(formData).subscribe((res: ResponseApi) => {
        const parent: TransactionCategoryComponent = this.data['parent'] as TransactionCategoryComponent;
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
