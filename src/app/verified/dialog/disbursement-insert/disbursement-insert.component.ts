// Nguyễn Thanh Tùng
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Disbursement } from 'src/app/class/disbursement';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { DisbursementComponent } from 'src/app/verified/pages/disbursement/disbursement.component';
import { DisbursementService } from 'src/app/service/disbursement.service';
import { Md5 } from 'ts-md5';
import { ResponseApi } from 'src/app/class/response-api';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-disbursement-insert',
  templateUrl: './disbursement-insert.component.html',
  styleUrls: ['./disbursement-insert.component.scss']
})
export class DisbursementInsertComponent implements OnInit {
  form: FormGroup;
  disbursement: Disbursement = new Disbursement();
  isEdit: boolean;
  get disbursementId() {
    return this.form.get('disbursementId');
  }
  get versionNumber() {
    return this.form.get('versionNumber');
  }
  get importSequenceNumber() {
    return this.form.get('importSequenceNumber');
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
  } get adjustmentComment() {
    return this.form.get('adjustmentComment');
  } get statusadjustmentReasonCode() {
    return this.form.get('adjustmentReason');
  } get adjustmentReasondisplay() {
    return this.form.get('adjustmentReasondisplay');
  } get adjustmentType() {
    return this.form.get('adjustmentType');
  } get adjustmentTypedisplay() {
    return this.form.get('adjustmentTypedisplay');
  } get adjustsOriginalTransactionId() {
    return this.form.get('adjustsOriginalTransactionId');
  } get amount() {
    return this.form.get('amount');
  } get transactionCurrencyId() {
    return this.form.get('transactionCurrencyId');
  } get exchangeRate() {
    return this.form.get('exchangeRate');
  } get amountBase() {
    return this.form.get('amountBase');
  } get awardId() {
    return this.form.get('awardId');
  } get bookDate() {
    return this.form.get('bookDate');
  }
  get comment() {
    return this.form.get('comment');
  } get description() {
    return this.form.get('description');
  } get isAdjusted() {
    return this.form.get('isAdjusted');
  } get postedDate() {
    return this.form.get('postedDate');
  } get requestDate() {
    return this.form.get('requestDate');
  } get scheduledDisbursementDate() {
    return this.form.get('scheduledDisbursementDate');
  } get sentDate() {
    return this.form.get('sentDate');
  } get status() {
    return this.form.get('status');
  } get statusDisplay() {
    return this.form.get('statusDisplay');
  } get type() {
    return this.form.get('type');
  } get typeDisplay() {
    return this.form.get('typeDisplay');
  }
  get budgetType() {
    return this.form.get('budgetType');
  } get budgetTypedisplay() {
    return this.form.get('budgetTypedisplay');
  } get currencyValueDate() {
    return this.form.get('currencyValueDate');
  }
  get adjustmentReason() {
    return this.form.get('adjustmentReason');
  }
  get disbursementChannelId() {
    return this.form.get('disbursementChannelId');
  }
  get financeTypeId() {
    return this.form.get('financeTypeId');
  }
  get flowTypeId() {
    return this.form.get('flowTypeId');
  }
  get humanitarian() {
    return this.form.get('humanitarian');
  }
  get periodEnd() {
    return this.form.get('periodEnd');
  }
  get periodStart() {
    return this.form.get('periodStart');
  }
  get providerActivityIdentifier() {
    return this.form.get('providerActivityIdentifier');
  }
  get providerOrganizationId() {
    return this.form.get('providerOrganizationId');
  }
  get recipientActivityIdentifier() {
    return this.form.get('recipientActivityIdentifier');
  }
  get recipientCountryDescription() {
    return this.form.get('recipientCountryDescription');
  }
  get recipientCountryId() {
    return this.form.get('recipientCountryId');
  }
  get recipientOrganizationId() {
    return this.form.get('recipientOrganizationId');
  }
  get recipientRegionDescription() {
    return this.form.get('recipientRegionDescription');
  }
  get recipientRegionId() {
    return this.form.get('recipientRegionId');
  }
  get tiedStatusId() {
    return this.form.get('tiedStatusId');
  }
  get transactionType() {
    return this.form.get('transactionType');
  }
  get transactionTypedisplay() {
    return this.form.get('transactionTypedisplay');
  }
  get recipientAccountId() {
    return this.form.get('recipientAccountId');
  }
  get recipientContactId() {
    return this.form.get('recipientContactId');
  }

  constructor(private disbursementService: DisbursementService,
    public dialogRef: MatDialogRef<DisbursementInsertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar) {
  }

  ngOnInit() {

    if (this.data['disbursement']) {
      this.disbursement = this.data['disbursement'];
      this.isEdit = true;
      this.form = new FormGroup({
        disbursementId: new FormControl(this.disbursement.disbursementId),
        versionNumber: new FormControl(this.disbursement.versionNumber),
        createdOn: new FormControl(this.disbursement.createdOn),
        createdBy: new FormControl(this.disbursement.createdBy),
        modifiedOn: new FormControl(this.disbursement.modifiedOn),
        modifiedBy: new FormControl(this.disbursement.modifiedBy),
        createdOnBehalfBy: new FormControl(this.disbursement.createdOnBehalfBy),
        modifiedOnBehalfBy: new FormControl(this.disbursement.modifiedOnBehalfBy),
        overriddenCreatedOn: new FormControl(this.disbursement.overriddenCreatedOn),
        importSequenceNumber: new FormControl(this.disbursement.importSequenceNumber),
        ownerIdType: new FormControl(this.disbursement.ownerIdType),
        ownerId: new FormControl(this.disbursement.ownerId),
        owningBusinessUnit: new FormControl(this.disbursement.owningBusinessUnit),
        owningUser: new FormControl(this.disbursement.owningUser),
        owningTeam: new FormControl(this.disbursement.owningTeam),
        timeZoneRuleVersionNumber: new FormControl(this.disbursement.timeZoneRuleVersionNumber),
        uTCConversionTimeZoneCode: new FormControl(this.disbursement.uTCConversionTimeZoneCode),
        stateCode: new FormControl(this.disbursement.stateCode),
        stateCodedisplay: new FormControl(this.disbursement.stateCodedisplay),
        statusCode: new FormControl(this.disbursement.statusCode),
        statusCodedisplay: new FormControl(this.disbursement.statusCodedisplay),///
        name: new FormControl(this.disbursement.name),
        adjustmentComment: new FormControl(this.disbursement.adjustmentComment),
        adjustmentReason: new FormControl(this.disbursement.adjustmentReason),
        adjustmentReasondisplay: new FormControl(this.disbursement.adjustmentReasondisplay),
        adjustmentType: new FormControl(this.disbursement.adjustmentType),
        adjustmentTypedisplay: new FormControl(this.disbursement.adjustmentTypedisplay),
        adjustsOriginalTransactionId: new FormControl(this.disbursement.adjustsOriginalTransactionId),
        amount: new FormControl(this.disbursement.amount),
        transactionCurrencyId: new FormControl(this.disbursement.transactionCurrencyId),
        exchangeRate: new FormControl(this.disbursement.exchangeRate),
        amountBase: new FormControl(this.disbursement.amountBase),
        awardId: new FormControl(this.disbursement.awardId),
        bookDate: new FormControl(this.disbursement.bookDate),
        comment: new FormControl(this.disbursement.comment),
        description: new FormControl(this.disbursement.description),
        isAdjusted: new FormControl(this.disbursement.isAdjusted),
        postedDate: new FormControl(this.disbursement.postedDate),
        requestDate: new FormControl(this.disbursement.requestDate),
        scheduledDisbursementDate: new FormControl(this.disbursement.scheduledDisbursementDate),
        sentDate: new FormControl(this.disbursement.sentDate),
        status: new FormControl(this.disbursement.status),
        statusDisplay: new FormControl(this.disbursement.statusDisplay),
        type: new FormControl(this.disbursement.type),
        typeDisplay: new FormControl(this.disbursement.typeDisplay),
        budgetType: new FormControl(this.disbursement.budgetType),
        budgetTypedisplay: new FormControl(this.disbursement.budgetTypedisplay),
        currencyValueDate: new FormControl(this.disbursement.currencyValueDate),
        disbursementChannelId: new FormControl(this.disbursement.disbursementChannelId),
        financeTypeId: new FormControl(this.disbursement.financeTypeId),
        flowTypeId: new FormControl(this.disbursement.flowTypeId),
        humanitarian: new FormControl(this.disbursement.humanitarian),
        periodEnd: new FormControl(this.disbursement.periodEnd),
        periodStart: new FormControl(this.disbursement.periodStart),
        providerActivityIdentifier: new FormControl(this.disbursement.providerActivityIdentifier),
        providerOrganizationId: new FormControl(this.disbursement.providerOrganizationId),
        recipientActivityIdentifier: new FormControl(this.disbursement.recipientActivityIdentifier),
        recipientCountryDescription: new FormControl(this.disbursement.recipientCountryDescription),
        recipientCountryId: new FormControl(this.disbursement.recipientCountryId),
        recipientOrganizationId: new FormControl(this.disbursement.recipientOrganizationId),
        recipientRegionDescription: new FormControl(this.disbursement.recipientRegionDescription),
        recipientRegionId: new FormControl(this.disbursement.recipientRegionId),
        tiedStatusId: new FormControl(this.disbursement.tiedStatusId),
        transactionType: new FormControl(this.disbursement.transactionType),
        transactionTypedisplay: new FormControl(this.disbursement.transactionTypedisplay),
        recipientAccountId: new FormControl(this.disbursement.recipientAccountId),
        recipientContactId: new FormControl(this.disbursement.recipientContactId),

      });
    } else {
      this.form = new FormGroup({
        disbursementId: new FormControl(this.disbursement.disbursementId),
        versionNumber: new FormControl(this.disbursement.versionNumber),
        createdOn: new FormControl(this.disbursement.createdOn),
        createdBy: new FormControl(this.disbursement.createdBy),
        modifiedOn: new FormControl(this.disbursement.modifiedOn),
        modifiedBy: new FormControl(this.disbursement.modifiedBy),
        createdOnBehalfBy: new FormControl(this.disbursement.createdOnBehalfBy),
        modifiedOnBehalfBy: new FormControl(this.disbursement.modifiedOnBehalfBy),
        overriddenCreatedOn: new FormControl(this.disbursement.overriddenCreatedOn),
        importSequenceNumber: new FormControl(this.disbursement.importSequenceNumber),
        ownerIdType: new FormControl(this.disbursement.ownerIdType),
        ownerId: new FormControl(this.disbursement.ownerId),
        owningBusinessUnit: new FormControl(this.disbursement.owningBusinessUnit),
        owningUser: new FormControl(this.disbursement.owningUser),
        owningTeam: new FormControl(this.disbursement.owningTeam),
        timeZoneRuleVersionNumber: new FormControl(this.disbursement.timeZoneRuleVersionNumber),
        uTCConversionTimeZoneCode: new FormControl(this.disbursement.uTCConversionTimeZoneCode),
        stateCode: new FormControl(this.disbursement.stateCode),
        stateCodedisplay: new FormControl(this.disbursement.stateCodedisplay),
        statusCode: new FormControl(this.disbursement.statusCode),
        statusCodedisplay: new FormControl(this.disbursement.statusCodedisplay),///
        name: new FormControl(this.disbursement.name),
        adjustmentComment: new FormControl(this.disbursement.adjustmentComment),
        adjustmentReason: new FormControl(this.disbursement.adjustmentReason),
        adjustmentReasondisplay: new FormControl(this.disbursement.adjustmentReasondisplay),
        adjustmentType: new FormControl(this.disbursement.adjustmentType),
        adjustmentTypedisplay: new FormControl(this.disbursement.adjustmentTypedisplay),
        adjustsOriginalTransactionId: new FormControl(this.disbursement.adjustsOriginalTransactionId),
        amount: new FormControl(this.disbursement.amount),
        transactionCurrencyId: new FormControl(this.disbursement.transactionCurrencyId),
        exchangeRate: new FormControl(this.disbursement.exchangeRate),
        amountBase: new FormControl(this.disbursement.amountBase),
        awardId: new FormControl(this.disbursement.awardId),
        bookDate: new FormControl(this.disbursement.bookDate),
        comment: new FormControl(this.disbursement.comment),
        description: new FormControl(this.disbursement.description),
        isAdjusted: new FormControl(this.disbursement.isAdjusted),
        postedDate: new FormControl(this.disbursement.postedDate),
        requestDate: new FormControl(this.disbursement.requestDate),
        scheduledDisbursementDate: new FormControl(this.disbursement.scheduledDisbursementDate),
        sentDate: new FormControl(this.disbursement.sentDate),
        status: new FormControl(this.disbursement.status),
        statusDisplay: new FormControl(this.disbursement.statusDisplay),
        type: new FormControl(this.disbursement.type),
        typeDisplay: new FormControl(this.disbursement.typeDisplay),
        budgetType: new FormControl(this.disbursement.budgetType),
        budgetTypedisplay: new FormControl(this.disbursement.budgetTypedisplay),
        currencyValueDate: new FormControl(this.disbursement.currencyValueDate),
        disbursementChannelId: new FormControl(this.disbursement.disbursementChannelId),
        financeTypeId: new FormControl(this.disbursement.financeTypeId),
        flowTypeId: new FormControl(this.disbursement.flowTypeId),
        humanitarian: new FormControl(this.disbursement.humanitarian),
        periodEnd: new FormControl(this.disbursement.periodEnd),
        periodStart: new FormControl(this.disbursement.periodStart),
        providerActivityIdentifier: new FormControl(this.disbursement.providerActivityIdentifier),
        providerOrganizationId: new FormControl(this.disbursement.providerOrganizationId),
        recipientActivityIdentifier: new FormControl(this.disbursement.recipientActivityIdentifier),
        recipientCountryDescription: new FormControl(this.disbursement.recipientCountryDescription),
        recipientCountryId: new FormControl(this.disbursement.recipientCountryId),
        recipientOrganizationId: new FormControl(this.disbursement.recipientOrganizationId),
        recipientRegionDescription: new FormControl(this.disbursement.recipientRegionDescription),
        recipientRegionId: new FormControl(this.disbursement.recipientRegionId),
        tiedStatusId: new FormControl(this.disbursement.tiedStatusId),
        transactionType: new FormControl(this.disbursement.transactionType),
        transactionTypedisplay: new FormControl(this.disbursement.transactionTypedisplay),
        recipientAccountId: new FormControl(this.disbursement.recipientAccountId),
        recipientContactId: new FormControl(this.disbursement.recipientContactId),
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
      this.disbursementService.edit(formData).subscribe((res: ResponseApi) => {
        const parent: DisbursementComponent = this.data['parent'] as DisbursementComponent;
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
      this.disbursementService.insert(formData).subscribe((res: ResponseApi) => {
        const parent: DisbursementComponent = this.data['parent'] as DisbursementComponent;
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
