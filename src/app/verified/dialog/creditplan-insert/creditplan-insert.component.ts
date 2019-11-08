import { Component, OnInit, Inject } from '@angular/core';
import { Creditplan } from 'src/app/class/creditplan';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { CreditplanService } from 'src/app/service/creditplan.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ResponseApi } from 'src/app/class/response-api';
import { startWith, map } from 'rxjs/operators';
import { Md5 } from 'ts-md5';
import { CreditplanComponent } from '../../pages/creditplan/creditplan.component';

@Component({
  selector: 'app-creditplan-insert',
  templateUrl: './creditplan-insert.component.html',
  styleUrls: ['./creditplan-insert.component.scss']
})
export class CreditplanInsertComponent implements OnInit {
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  credit: Creditplan = new Creditplan();
  companys = [];
  isEdit: boolean;
  result = false;
  showPassword = true;
  filteredWorkingTeam;

  form: FormGroup;
  get creditPlanId() {
    return this.form.get('creditPlanId');
  }
  get createdOn() {
    return this.form.get('createdOn');
  }
  get createdBy() {
    return this.form.get('createdBy');
  }
  get modifiedOn() {
    return this.form.get('modifiedOn');
  }
  get modifiedBy() {
    return this.form.get('modifiedBy');
  }
  get createdOnBehalfBy() {
    return this.form.get('createdOnBehalfBy');
  }
  get modifiedOnBehalfBy() {
    return this.form.get('modifiedOnBehalfBy');
  }
  get overriddenCreatedOn() {
    return this.form.get('overriddenCreatedOn');
  }
  get importSequenceNumber() {
    return this.form.get('importSequenceNumber');
  }
  get ownerIdType() {
    return this.form.get('ownerIdType');
  }
  get ownerId() {
    return this.form.get('ownerId');
  }
  get owningBusinessUnit() {
    return this.form.get('owningBusinessUnit');
  }
  get owningUser() {
    return this.form.get('owningUser');
  }
  get owningTeam() {
    return this.form.get('owningTeam');
  }
  get timeZoneRuleVersionNumber() {
    return this.form.get('timeZoneRuleVersionNumber');
  }
  get UTCConversionTimeZoneCode() {
    return this.form.get('UTCConversionTimeZoneCode');
  }
  get versionNumber() {
    return this.form.get('versionNumber');
  }
  get stateCode() {
    return this.form.get('stateCode');
  }
  get stateCode_display() {
    return this.form.get('stateCode_display');
  }
  get statusCode() {
    return this.form.get('statusCode');
  }
  get statusCode_display() {
    return this.form.get('statusCode_display');
  }
  get creditPlanCampaignId() {
    return this.form.get('creditPlanCampaignId');
  }
  get creditType() {
    return this.form.get('creditType');
  }

  get creditType_display() {
    return this.form.get('creditType_display');
  }

  get validToDate() {
    return this.form.get('validToDate');
  }

  constructor(private creditplanService: CreditplanService,
    public dialogRef: MatDialogRef<CreditplanInsertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    if (this.data['creditplan']) {
      this.credit = this.data['creditplan'];
      this.isEdit = true;
      this.form = new FormGroup({
        creditPlanId: new FormControl(this.credit.creditPlanId),
        createdOn: new FormControl(this.credit.createdOn, [Validators.required]),
        createdBy: new FormControl(this.credit.createdBy),
        modifiedOn: new FormControl(this.credit.modifiedOn),
        modifiedBy: new FormControl(this.credit.modifiedBy),
        createdOnBehalfBy: new FormControl(this.credit.createdOnBehalfBy),
        modifiedOnBehalfBy: new FormControl(this.credit.modifiedOnBehalfBy),
        overriddenCreatedOn: new FormControl(this.credit.overriddenCreatedOn),
        importSequenceNumber: new FormControl(this.credit.importSequenceNumber),
        ownerIdType: new FormControl(this.credit.ownerIdType),
        ownerId: new FormControl(this.credit.ownerId),
        owningBusinessUnit: new FormControl(this.credit.owningBusinessUnit),
        owningUser: new FormControl(this.credit.owningUser),
        owningTeam: new FormControl(this.credit.owningTeam),
        timeZoneRuleVersionNumber: new FormControl(this.credit.timeZoneRuleVersionNumber),
        UTCConversionTimeZoneCode: new FormControl(this.credit.UTCConversionTimeZoneCode, [Validators.required]),
        versionNumber: new FormControl(this.credit.versionNumber),
        stateCode: new FormControl(this.credit.stateCode),
        stateCode_display: new FormControl(this.credit.stateCode_display, [Validators.required]),
        statusCode: new FormControl(this.credit.statusCode),
        statusCode_display: new FormControl(this.credit.statusCode_display,  [Validators.required]),
        creditPlanCampaignId: new FormControl(this.credit.creditPlanCampaignId),
        creditType: new FormControl(this.credit.creditType),
        creditType_display: new FormControl(this.credit.creditType_display, [Validators.required]),
        validToDate: new FormControl(this.credit.validToDate),


      });
    } else {
      this.form = new FormGroup({
        createdOn: new FormControl(this.credit.createdOn, [Validators.required]),
        createdBy: new FormControl(this.credit.createdBy, [Validators.required]),
        modifiedOn: new FormControl(this.credit.modifiedOn),
        modifiedBy: new FormControl(this.credit.modifiedBy),
        createdOnBehalfBy: new FormControl(this.credit.createdOnBehalfBy),
        modifiedOnBehalfBy: new FormControl(this.credit.modifiedOnBehalfBy),
        overriddenCreatedOn: new FormControl(this.credit.overriddenCreatedOn),
        importSequenceNumber: new FormControl(this.credit.importSequenceNumber),
        ownerIdType: new FormControl(this.credit.ownerIdType),
        ownerId: new FormControl(this.credit.ownerId),
        owningBusinessUnit: new FormControl(this.credit.owningBusinessUnit),
        owningUser: new FormControl(this.credit.owningUser),
        owningTeam: new FormControl(this.credit.owningTeam),
        timeZoneRuleVersionNumber: new FormControl(this.credit.timeZoneRuleVersionNumber),
        UTCConversionTimeZoneCode: new FormControl(this.credit.UTCConversionTimeZoneCode),
        versionNumber: new FormControl(this.credit.versionNumber),
        stateCode: new FormControl(this.credit.stateCode),
        stateCode_display: new FormControl(this.credit.stateCode_display),
        statusCode: new FormControl(this.credit.statusCode),
        statusCode_display: new FormControl(this.credit.statusCode_display),
        creditPlanCampaignId: new FormControl(this.credit.creditPlanCampaignId),
        creditType: new FormControl(this.credit.creditType),
        creditType_display: new FormControl(this.credit.creditType_display),
        validToDate: new FormControl(this.credit.validToDate),
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
      this.creditplanService.edit(formData).subscribe((res: ResponseApi) => {
        const parent: CreditplanComponent = this.data['parent'] as CreditplanComponent;
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
      this.creditplanService.insert(formData).subscribe((res: ResponseApi) => {
        const parent: CreditplanComponent = this.data['parent'] as CreditplanComponent;
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