import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ResponseApi } from 'src/app/class/response-api';
import { PersonnelComponent } from '../../pages/personnel/personnel.component';
import { Md5 } from 'ts-md5';
import { MainAccountCategory } from 'src/app/class/main-account-category';
import { MainAccountCategoryService } from 'src/app/service/main-account-category.service';

@Component({
  selector: 'app-main-account-category-insert',
  templateUrl: './main-account-category-insert.component.html',
  styleUrls: ['./main-account-category-insert.component.scss']
})
export class MainAccountCategoryInsertComponent implements OnInit {
  mainAccountCategory: MainAccountCategory = new MainAccountCategory();
  companys = [];
  isEdit: boolean;
  result = false;


  form: FormGroup;
  get name() {
    return this.form.get('name');
  }
  get mainAccountCategoryId(){
    return this.form.get('mainAccountCategoryId');
  }
  get description(){
    return this.form.get('description');
  }

  constructor(private mainAccountCategoryService: MainAccountCategoryService,
    public dialogRef: MatDialogRef<MainAccountCategoryInsertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar) {
  }

  ngOnInit() {

    if (this.data['mainaccount']) {
      this.mainAccountCategory = this.data['mainaccount'];
      this.isEdit = true;
      this.form = new FormGroup({
        mainAccountCategoryId: new FormControl(this.mainAccountCategory.mainAccountCategoryId, [Validators.required]),
        name: new FormControl(this.mainAccountCategory.name, [Validators.required]),
        description: new FormControl(this.mainAccountCategory.description, [Validators.required])

      });
    } else {
      this.form = new FormGroup({
        name: new FormControl(this.mainAccountCategory.name, [Validators.required]),
        description: new FormControl(this.mainAccountCategory.description, [Validators.required])

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
      this.mainAccountCategoryService.edit(formData).subscribe((res: ResponseApi) => {
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
      this.mainAccountCategoryService.insert(formData).subscribe((res: ResponseApi) => {
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
