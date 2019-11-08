import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import {CreditPlanRecipientService} from 'src/app/service/credit-plan-recipient.service';
import {CreditPlanRecipient} from 'src/app/class/credit-plan-recipient';
import { Md5 } from 'ts-md5';
import { ResponseApi } from 'src/app/class/response-api';
import { PersonnelComponent } from '../../pages/personnel/personnel.component';

@Component({
  selector: 'app-credit-plan-receipt-insert',
  templateUrl: './credit-plan-receipt-insert.component.html',
  styleUrls: ['./credit-plan-receipt-insert.component.scss']
})
export class CreditPlanReceiptInsertComponent implements OnInit {
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



  creditplanrecipient: CreditPlanRecipient = new CreditPlanRecipient();
  companys = [];
  isEdit: boolean;
  result = false;
  showPassword = true;
  filteredWorkingTeam;

  form: FormGroup;
  get name() {
    return this.form.get('name');
  }
  get creditRecipientId(){
    return this.form.get('creditRecipientId');
  }
  get createdOn() {
    return this.form.get('createdOn');
  }
  get modifiedOn(){
    return this.form.get('modifiedOn');
  }
  get overriddenCreatedOn() {
    return this.form.get('overriddenCreatedOn');
  }
  get owningUser(){
    return this.form.get('owningUser');
  }
  get owningBusinessUnit() {
    return this.form.get('owningBusinessUnit');
  }
  get owningTeam(){
    return this.form.get('owningTeam');
  }
  get createdBy() {
    return this.form.get('createdBy');
  }
  get modifiedBy(){
    return this.form.get('modifiedBy');
  }
  get createdOnBehalfBy() {
    return this.form.get('createdOnBehalfBy');
  }
  get modifiedOnBehalfBy(){
    return this.form.get('modifiedOnBehalfBy');
  }
  get stateCode(){
    return this.form.get('stateCode');
  }
  get stateCodedisplay   (){
    return this.form.get('stateCodedisplay ');
  }
  get statusCode(){
    return this.form.get('statusCode');
  }
  get statusCodedisplay(){
    return this.form.get('statusCodedisplay');
  }
  get ownerIdType(){
    return this.form.get('ownerIdType');
  }
  get creditPlanRecipientCustomerIdType(){
    return this.form.get('creditPlanRecipientCustomerIdType');
  }
  get creditPlanRecipientCustomerId(){
    return this.form.get('creditPlanRecipientCustomerId');
  }
  get softCreditReasondisplay(){
    return this.form.get('softCreditReasondisplay');
  }
  get importSequenceNumber(){
    return this.form.get('importSequenceNumber');
  }
  get softCreditReason(){
    return this.form.get('softCreditReason');
  }
  get percentageOfPayment(){
    return this.form.get('percentageOfPayment');
  }
  get ownerId(){
    return this.form.get('ownerId');
  }
  get timeZoneRuleVersionNumber(){
    return this.form.get('timeZoneRuleVersionNumber');
  }
  get versionNumber(){
    return this.form.get('versionNumber');
  }


  constructor(private creditplanRecipientservice: CreditPlanRecipientService,
    public dialogRef: MatDialogRef<CreditPlanReceiptInsertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar) {
  }

  ngOnInit() {

    if (this.data['creditplan']) {
      this.creditplanrecipient = this.data['creditplan'];
      this.isEdit = true;
      this.form = new FormGroup({
        creditRecipientId: new FormControl(this.creditplanrecipient.creditRecipientId),
        createdOn: new FormControl(this.creditplanrecipient.createdOn, [Validators.required]),
        modifiedOn: new FormControl(this.creditplanrecipient.modifiedOn, [Validators.required]),
        overriddenCreatedOn: new FormControl(this.creditplanrecipient.overriddenCreatedOn, [Validators.required]),
        owningUser: new FormControl(this.creditplanrecipient.owningUser, [Validators.required]),
        owningBusinessUnit: new FormControl(this.creditplanrecipient.owningBusinessUnit, [Validators.required]),
        owningTeam: new FormControl(this.creditplanrecipient.owningTeam, [Validators.required]),
        createdBy: new FormControl(this.creditplanrecipient.createdBy, [Validators.required]),
        modifiedBy: new FormControl(this.creditplanrecipient.modifiedBy, [Validators.required]),
        createdOnBehalfBy: new FormControl(this.creditplanrecipient.createdOnBehalfBy, [Validators.required]),
        modifiedOnBehalfBy: new FormControl(this.creditplanrecipient.modifiedOnBehalfBy, [Validators.required]),
        importSequenceNumber: new FormControl(this.creditplanrecipient.importSequenceNumber, [Validators.required]),
        stateCode: new FormControl(this.creditplanrecipient.stateCode, [Validators.required]),
        // stateCodedisplay: new FormControl(this.creditplanrecipient.stateCodedisplay, [Validators.required]),
        statusCode: new FormControl(this.creditplanrecipient.statusCode, [Validators.required]),
        statusCodedisplay: new FormControl(this.creditplanrecipient.statusCodedisplay, [Validators.required]),
         name: new FormControl(this.creditplanrecipient.name, [Validators.required]),

         ownerIdType: new FormControl(this.creditplanrecipient.ownerIdType, [Validators.required]),
         creditPlanRecipientCustomerIdType: new FormControl(this.creditplanrecipient.creditPlanRecipientCustomerIdType, [Validators.required]),
         creditPlanRecipientCustomerId: new FormControl(this.creditplanrecipient.creditPlanRecipientCustomerId, [Validators.required]),
         softCreditReasondisplay: new FormControl(this.creditplanrecipient.softCreditReasondisplay, [Validators.required]),
         softCreditReason: new FormControl(this.creditplanrecipient.softCreditReason, [Validators.required]),
         percentageOfPayment: new FormControl(this.creditplanrecipient.percentageOfPayment, [Validators.required]),
         ownerId: new FormControl(this.creditplanrecipient.ownerId, [Validators.required]),
         timeZoneRuleVersionNumber: new FormControl(this.creditplanrecipient.timeZoneRuleVersionNumber, [Validators.required]),
         versionNumber: new FormControl(this.creditplanrecipient.versionNumber, [Validators.required]),


      });
    } else {
      this.form = new FormGroup({
        createdOn: new FormControl(this.creditplanrecipient.createdOn, [Validators.required]),
        modifiedOn: new FormControl(this.creditplanrecipient.modifiedOn, [Validators.required]),
        overriddenCreatedOn: new FormControl(this.creditplanrecipient.overriddenCreatedOn, [Validators.required]),
        owningUser: new FormControl(this.creditplanrecipient.owningUser, [Validators.required]),
        owningBusinessUnit: new FormControl(this.creditplanrecipient.owningBusinessUnit, [Validators.required]),
        owningTeam: new FormControl(this.creditplanrecipient.owningTeam, [Validators.required]),
        createdBy: new FormControl(this.creditplanrecipient.createdBy, [Validators.required]),
        modifiedBy: new FormControl(this.creditplanrecipient.modifiedBy, [Validators.required]),
        createdOnBehalfBy: new FormControl(this.creditplanrecipient.createdOnBehalfBy, [Validators.required]),
        modifiedOnBehalfBy: new FormControl(this.creditplanrecipient.modifiedOnBehalfBy, [Validators.required]),
        importSequenceNumber: new FormControl(this.creditplanrecipient.importSequenceNumber, [Validators.required]),
        stateCode: new FormControl(this.creditplanrecipient.stateCode, [Validators.required]),
        // stateCodedisplay: new FormControl(this.creditplanrecipient.stateCodedisplay, [Validators.required]),
        statusCode: new FormControl(this.creditplanrecipient.statusCode, [Validators.required]),
        statusCodedisplay: new FormControl(this.creditplanrecipient.statusCodedisplay, [Validators.required]),
         name: new FormControl(this.creditplanrecipient.name, [Validators.required]),

         ownerIdType: new FormControl(this.creditplanrecipient.ownerIdType, [Validators.required]),
         creditPlanRecipientCustomerIdType: new FormControl(this.creditplanrecipient.creditPlanRecipientCustomerIdType, [Validators.required]),
         creditPlanRecipientCustomerId: new FormControl(this.creditplanrecipient.creditPlanRecipientCustomerId, [Validators.required]),
         softCreditReasondisplay: new FormControl(this.creditplanrecipient.softCreditReasondisplay, [Validators.required]),
         softCreditReason: new FormControl(this.creditplanrecipient.softCreditReason, [Validators.required]),
         percentageOfPayment: new FormControl(this.creditplanrecipient.percentageOfPayment, [Validators.required]),
         ownerId: new FormControl(this.creditplanrecipient.ownerId, [Validators.required]),
         timeZoneRuleVersionNumber: new FormControl(this.creditplanrecipient.timeZoneRuleVersionNumber, [Validators.required]),
         versionNumber: new FormControl(this.creditplanrecipient.versionNumber, [Validators.required]),

      });
    }

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
      this.creditplanRecipientservice.edit(formData).subscribe((res: ResponseApi) => {
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
      this.creditplanRecipientservice.insert(formData).subscribe((res: ResponseApi) => {
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
