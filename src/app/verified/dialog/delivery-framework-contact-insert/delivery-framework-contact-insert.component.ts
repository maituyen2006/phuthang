import { Component, OnInit, Inject } from '@angular/core';
import { DeliveryFrameworkContact } from 'src/app/class/delivery-framework-contact';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Md5 } from 'ts-md5';
import { ResponseApi } from 'src/app/class/response-api';
import { PersonnelComponent } from '../../pages/personnel/personnel.component';
import { DeliveryFrameworkContactService } from 'src/app/service/delivery-framework-contact.service';


@Component({
  selector: 'app-delivery-framework-contact-insert',
  templateUrl: './delivery-framework-contact-insert.component.html',
  styleUrls: ['./delivery-framework-contact-insert.component.scss']
})
export class DeliveryFrameworkContactInsertComponent implements OnInit {
  deliveryFrameworkContact: DeliveryFrameworkContact = new DeliveryFrameworkContact();
  companys = [];
  isEdit: boolean;
  result = false;
  showPassword = true;
  filteredWorkingTeam;

  form: FormGroup;
  get name() {
    return this.form.get('name');
  }
  get deliveryFrameworkContactId(){
    return this.form.get('deliveryFrameworkContactId');
  }

  constructor(private deliveryFrameworkContactService: DeliveryFrameworkContactService,
    public dialogRef: MatDialogRef<DeliveryFrameworkContactService>,
    @Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar) {
  }

  ngOnInit() {

    if (this.data['deliveryFrameworkContactedit']) {
      this.deliveryFrameworkContact = this.data['deliveryFrameworkContactedit'];
      this.isEdit = true;
      this.form = new FormGroup({
        deliveryFrameworkContactId: new FormControl(this.deliveryFrameworkContact.deliveryFrameworkContactId, ),
        name: new FormControl(this.deliveryFrameworkContact.name, [Validators.required]),

      });
    } else {
      this.form = new FormGroup({
        name: new FormControl(this.deliveryFrameworkContact.name, [Validators.required]),

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
      this.deliveryFrameworkContactService.edit(formData).subscribe((res: ResponseApi) => {
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
      this.deliveryFrameworkContactService.insert(formData).subscribe((res: ResponseApi) => {
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
