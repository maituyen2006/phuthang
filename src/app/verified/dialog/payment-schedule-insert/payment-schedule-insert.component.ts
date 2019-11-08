import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { PaymentSchedule } from 'src/app/class/payment-schedule';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { PaymentScheduleService } from 'src/app/service/payment-schedule.service';
import { PaymentScheduleComponent } from '../../pages/payment-schedule/payment-schedule.component';
import { Md5 } from 'ts-md5';
import { ResponseApi } from 'src/app/class/response-api';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-payment-schedule-insert',
  templateUrl: './payment-schedule-insert.component.html',
  styleUrls: ['./payment-schedule-insert.component.scss']
})
export class PaymentScheduleInsertComponent implements OnInit {
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
  paymentschedule: PaymentSchedule = new PaymentSchedule();
  // adminRoles = [];
  // companys = [];
  isEdit: boolean;
  result = false;
  // showPassword = true;
  filteredWorkingTeam;

  form: FormGroup;
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
  get uTCConversionTimeZoneCode() {
    return this.form.get('uTCConversionTimeZoneCode');
  }
  get versionNumber() {
    return this.form.get('versionNumber');
  }
  get stateCode() {
    return this.form.get('stateCode');
  }
  get stateCodedisplay() {
    return this.form.get('stateCodedisplay');
  }
  get statusCode() {
    return this.form.get('statusCode');
  }
  get statusCodedisplay() {
    return this.form.get('statusCodedisplay');
  }
  get name() {
    return this.form.get('name');
  }
  get firstPaymentDate() {
    return this.form.get('firstPaymentDate');
  }
  get frequency() {
    return this.form.get('frequency');
  }
  get frequencyDisplay() {
    return this.form.get('frequencyDisplay');
  }
  get frequencyInterval() {
    return this.form.get('frequencyInterval');
  }
  get lastPaymentDate() {
    return this.form.get('lastPaymentDate');
  }
  get nextPaymentAmount() {
    return this.form.get('nextPaymentAmount');
  }
  get transactionCurrencyId() {
    return this.form.get('transactionCurrencyId');
  }
  get exchangeRate() {
    return this.form.get('exchangeRate');
  }
  get nextPaymentAmountBase() {
    return this.form.get('nextPaymentAmountBase');
  }
  get nextPaymentDate() {
    return this.form.get('nextPaymentDate');
  }
  get numberOfPayments() {
    return this.form.get('numberOfPayments');
  }
  get omtSchedDefaultHardCreditToCustomer() {
    return this.form.get('omtSchedDefaultHardCreditToCustomer');
  }
  get paymentScheduleDonorCommitmentId() {
    return this.form.get('paymentScheduleDonorCommitmentId');
  }
  get receiptOnAccountId() {
    return this.form.get('receiptOnAccountId');
  }
  get recurringAmount() {
    return this.form.get('recurringAmount');
  }
  get recurringamountBase() {
    return this.form.get('recurringamountBase');
  }
  get totalAmount() {
    return this.form.get('totalAmount');
  }
  get totalamountBase() {
    return this.form.get('totalamountBase');
  }

  constructor(private paymentscheduleservice: PaymentScheduleService,
    public dialogRef: MatDialogRef<PaymentScheduleInsertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    if (this.data['paymentschedule']) {
      this.paymentschedule = this.data['paymentschedule'];
      this.isEdit = true;
      this.form = new FormGroup({
        paymentScheduleId: new FormControl(this.paymentschedule.paymentScheduleId, [Validators.required]),
        createdOn: new FormControl(this.paymentschedule.createdOn, [Validators.required]),
        createdBy: new FormControl(this.paymentschedule.createdBy, [Validators.required]),
        modifiedOn: new FormControl(this.paymentschedule.modifiedOn, [Validators.required]),
        modifiedBy: new FormControl(this.paymentschedule.modifiedBy, [Validators.required]),
        createdOnBehalfBy: new FormControl(this.paymentschedule.createdOnBehalfBy, [Validators.required]),
        modifiedOnBehalfBy: new FormControl(this.paymentschedule.modifiedOnBehalfBy, [Validators.required]),
        overriddenCreatedOn: new FormControl(this.paymentschedule.overriddenCreatedOn),
        importSequenceNumber: new FormControl(this.paymentschedule.importSequenceNumber,),
        ownerIdType: new FormControl(this.paymentschedule.ownerIdType, [Validators.required]),
        ownerId: new FormControl(this.paymentschedule.ownerId, [Validators.required]),
        owningBusinessUnit: new FormControl(this.paymentschedule.owningBusinessUnit, [Validators.required]),
        owningUser: new FormControl(this.paymentschedule.owningUser, [Validators.required]),
        owningTeam: new FormControl(this.paymentschedule.owningTeam, [Validators.required]),
        timeZoneRuleVersionNumber: new FormControl(this.paymentschedule.timeZoneRuleVersionNumber, [Validators.required]),
        uTCConversionTimeZoneCode: new FormControl(this.paymentschedule.uTCConversionTimeZoneCode),
        versionNumber: new FormControl(this.paymentschedule.versionNumber),
        stateCode: new FormControl(this.paymentschedule.stateCode, [Validators.required]),
        stateCodedisplay: new FormControl(this.paymentschedule.stateCodedisplay, [Validators.required]),
        statusCode: new FormControl(this.paymentschedule.statusCode, [Validators.required]),
        statusCodedisplay: new FormControl(this.paymentschedule.statusCodedisplay, [Validators.required]),
        name: new FormControl(this.paymentschedule.name, [Validators.required]),
        firstPaymentDate: new FormControl(this.paymentschedule.firstPaymentDate, [Validators.required]),
        frequency: new FormControl(this.paymentschedule.frequency, [Validators.required]),
        frequencyDisplay: new FormControl(this.paymentschedule.frequencyDisplay, [Validators.required]),
        frequencyInterval: new FormControl(this.paymentschedule.frequencyInterval),
        lastPaymentDate: new FormControl(this.paymentschedule.lastPaymentDate, [Validators.required]),
        nextPaymentAmount: new FormControl(this.paymentschedule.nextPaymentAmount, [Validators.required]),
        transactionCurrencyId: new FormControl(this.paymentschedule.transactionCurrencyId, [Validators.required]),
        exchangeRate: new FormControl(this.paymentschedule.exchangeRate, [Validators.required]),
        nextPaymentAmountBase: new FormControl(this.paymentschedule.nextPaymentAmountBase, [Validators.required]),
        nextPaymentDate: new FormControl(this.paymentschedule.nextPaymentDate, [Validators.required]),
        numberOfPayments: new FormControl(this.paymentschedule.numberOfPayments, [Validators.required]),
        omtSchedDefaultHardCreditToCustomer: new FormControl(this.paymentschedule.omtSchedDefaultHardCreditToCustomer, [Validators.required]),
        paymentScheduleDonorCommitmentId: new FormControl(this.paymentschedule.paymentScheduleDonorCommitmentId, [Validators.required]),
        receiptOnAccountId: new FormControl(this.paymentschedule.receiptOnAccountId, [Validators.required]),
        recurringAmount: new FormControl(this.paymentschedule.recurringAmount),
        recurringamountBase: new FormControl(this.paymentschedule.recurringamountBase, [Validators.required]),
        totalAmount: new FormControl(this.paymentschedule.totalAmount, [Validators.required]),
        totalamountBase: new FormControl(this.paymentschedule.totalamountBase, [Validators.required])
       
      });
    } else {
      this.form = new FormGroup({
        createdOn: new FormControl(null, [Validators.required]),
        createdBy: new FormControl(null, [Validators.required]),
        modifiedOn: new FormControl(null, [Validators.required]),
        modifiedBy: new FormControl(null, [Validators.required]),
        createdOnBehalfBy: new FormControl(null, [Validators.required]),
        modifiedOnBehalfBy: new FormControl(null, [Validators.required]),
        overriddenCreatedOn: new FormControl(null, [Validators.required]),
        importSequenceNumber: new FormControl(null, [Validators.required]),
        ownerIdType: new FormControl(null, [Validators.required]),
        ownerId: new FormControl(null, [Validators.required]),
        owningBusinessUnit: new FormControl(null, [Validators.required]),
        owningUser: new FormControl(null, [Validators.required]),
        owningTeam: new FormControl(null, [Validators.required]),
        timeZoneRuleVersionNumber: new FormControl(null, [Validators.required]),
        uTCConversionTimeZoneCode: new FormControl(null, [Validators.required]),
        versionNumber: new FormControl(null, [Validators.required]),
        stateCode: new FormControl(null, [Validators.required]),
        stateCodedisplay: new FormControl(null, [Validators.required]),
        statusCode: new FormControl(null, [Validators.required]),
        statusCodedisplay: new FormControl(null, [Validators.required]),
        name: new FormControl(null, [Validators.required]),
        firstPaymentDate: new FormControl(null, [Validators.required]),
        frequency: new FormControl(null, [Validators.required]),
        frequencyDisplay: new FormControl(null, [Validators.required]),
        frequencyInterval: new FormControl(null, [Validators.required]),
        lastPaymentDate: new FormControl(null, [Validators.required]),
        nextPaymentAmount: new FormControl(null, [Validators.required]),
        transactionCurrencyId: new FormControl(null, [Validators.required]),
        exchangeRate: new FormControl(null, [Validators.required]),
        nextPaymentAmountBase: new FormControl(null, [Validators.required]),
        nextPaymentDate: new FormControl(null, [Validators.required]),
        numberOfPayments: new FormControl(null, [Validators.required]),
        omtSchedDefaultHardCreditToCustomer: new FormControl(null, [Validators.required]),
        paymentScheduleDonorCommitmentId: new FormControl(null, [Validators.required]),
        receiptOnAccountId: new FormControl(null, [Validators.required]),
        recurringAmount: new FormControl(null, [Validators.required]),
        recurringamountBase: new FormControl(null, [Validators.required]),
        totalAmount: new FormControl(null, [Validators.required]),
        totalamountBase: new FormControl(null, [Validators.required])
        
      });
    }
  }
  getErrorMessage(input: any) {
    return 'Hãy nhập thông tin !!!';
  }
  onSubmit(form: FormGroup): void {
    if (form.invalid) {
      return;
    }
    const formData = this.form.value;
    if (this.isEdit) {
      this.paymentscheduleservice.edit(formData).subscribe((res: ResponseApi) => {
        const parent: PaymentScheduleComponent = this.data['parent'] as PaymentScheduleComponent;
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
      this.paymentscheduleservice.insert(formData).subscribe((res: ResponseApi) => {
        const parent: PaymentScheduleComponent = this.data['parent'] as PaymentScheduleComponent;
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



