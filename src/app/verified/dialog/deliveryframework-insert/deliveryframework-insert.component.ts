import { Component, OnInit, Inject } from '@angular/core';
import { Deliveryframework } from 'src/app/class/deliveryframework';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DeliveryframeworkService } from 'src/app/service/deliveryframework.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ResponseApi } from 'src/app/class/response-api';
import { DeliveryframeworkComponent } from '../../pages/deliveryframework/deliveryframework.component';

@Component({
  selector: 'app-deliveryframework-insert',
  templateUrl: './deliveryframework-insert.component.html',
  styleUrls: ['./deliveryframework-insert.component.scss']
})
export class DeliveryframeworkInsertComponent implements OnInit {
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
  
  deliveryframework: Deliveryframework = new Deliveryframework();
  isEdit: boolean;

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
  get versionNumber() {
    return this.form.get('versionNumber');
  }
  get deliveryFrameworkId() {
    return this.form.get('deliveryFrameworkId');
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
  get deliveryFrameworkType() {
    return this.form.get('deliveryFrameworkType');
  }
  get deliveryFrameworkTypedisplay() {
    return this.form.get('deliveryFrameworkTypedisplay');
  }
  get description() {
    return this.form.get('description');
  }
  get endDate() {
    return this.form.get('endDate');
  }
  get goal() {
    return this.form.get('goal');
  }
  get objectiveId() {
    return this.form.get('objectiveId');
  }
  get parentDeliveryFrameworkId() {
    return this.form.get('parentDeliveryFrameworkId');
  }
  get plannedEndDate() {
    return this.form.get('plannedEndDate');
  }
  get plannedStartDate() {
    return this.form.get('plannedStartDate');
  }
  get scope() {
    return this.form.get('scope');
  }
  get scopeDisplay() {
    return this.form.get('scopeDisplay');
  }
  get startDate() {
    return this.form.get('startDate');
  }
  get status() {
    return this.form.get('status');
  }
  get statusDisplay() {
    return this.form.get('statusDisplay');
  }
  get budgetNotProvided() {
    return this.form.get('budgetNotProvided');
  }
  get capitalSpend() {
    return this.form.get('capitalSpend');
  }
  get collaborationType() {
    return this.form.get('collaborationType');
  }
  get msiatiCollaborationTypedisplay() {
    return this.form.get('msiatiCollaborationTypedisplay');
  }
  get defaultCurrency() {
    return this.form.get('defaultCurrency');
  }
  get defaultFinanceType() {
    return this.form.get('defaultFinanceType');
  }
  get defaultFlowType() {
    return this.form.get('defaultFlowType');
  }
  get defaultLanguage() {
    return this.form.get('defaultLanguage');
  }
  get defaultTiedStatusId() {
    return this.form.get('defaultTiedStatusId');
  }
  get hierarchyLevel() {
    return this.form.get('hierarchyLevel');
  }
  get humanitarianScope() {
    return this.form.get('humanitarianScope');
  }
  get iatiactivityId() {
    return this.form.get('iatiactivityId');
  }
  get scopeId() {
    return this.form.get('scopeId');
  }
  get account() {
    return this.form.get('account');
  }
  get utcconversionTimeZoneCode() {
    return this.form.get('utcconversionTimeZoneCode');
  }
  constructor(private deliveryframeworkService: DeliveryframeworkService,
    public dialogRef: MatDialogRef<DeliveryframeworkInsertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar) { }

  ngOnInit() {

    if (this.data['deliveryframework']) {
      this.deliveryframework = this.data['deliveryframework'];
      this.isEdit = true;
      this.form = new FormGroup({
        deliveryFrameworkId: new FormControl(this.deliveryframework.deliveryFrameworkId),
        ownerIdType: new FormControl(this.deliveryframework.ownerIdType),
        ownerId: new FormControl(this.deliveryframework.ownerId),
        objectiveId: new FormControl(this.deliveryframework.objectiveId),
        parentDeliveryFrameworkId: new FormControl(this.deliveryframework.parentDeliveryFrameworkId),
        defaultTiedStatusId: new FormControl(this.deliveryframework.defaultTiedStatusId),
        iatiactivityId: new FormControl(this.deliveryframework.iatiactivityId),
        scopeId: new FormControl(this.deliveryframework.scopeId),
        createdOn: new FormControl(this.deliveryframework.createdOn),
        createdBy: new FormControl(this.deliveryframework.createdBy),
        modifiedOn: new FormControl(this.deliveryframework.modifiedOn),
        modifiedBy: new FormControl(this.deliveryframework.modifiedBy),
        createdOnBehalfBy: new FormControl(this.deliveryframework.createdOnBehalfBy),
        modifiedOnBehalfBy: new FormControl(this.deliveryframework.modifiedOnBehalfBy),
        overriddenCreatedOn: new FormControl(this.deliveryframework.overriddenCreatedOn),
        importSequenceNumber: new FormControl(this.deliveryframework.importSequenceNumber),
        owningBusinessUnit: new FormControl(this.deliveryframework.owningBusinessUnit),
        owningUser: new FormControl(this.deliveryframework.owningUser),
        owningTeam: new FormControl(this.deliveryframework.owningTeam),
        timeZoneRuleVersionNumber: new FormControl(this.deliveryframework.timeZoneRuleVersionNumber),
        versionNumber: new FormControl(this.deliveryframework.versionNumber),
        stateCode: new FormControl(this.deliveryframework.stateCode),
        stateCodedisplay: new FormControl(this.deliveryframework.stateCodedisplay),
        statusCode: new FormControl(this.deliveryframework.statusCode),
        statusCodedisplay: new FormControl(this.deliveryframework.statusCodedisplay),
        name: new FormControl(this.deliveryframework.name),
        deliveryFrameworkType: new FormControl(this.deliveryframework.deliveryFrameworkType),
        deliveryFrameworkTypedisplay: new FormControl(this.deliveryframework.deliveryFrameworkTypedisplay),
        description: new FormControl(this.deliveryframework.description),
        endDate: new FormControl(this.deliveryframework.endDate),
        goal: new FormControl(this.deliveryframework.goal),
        plannedEndDate: new FormControl(this.deliveryframework.plannedEndDate),
        plannedStartDate: new FormControl(this.deliveryframework.plannedStartDate),
        scope: new FormControl(this.deliveryframework.scope),
        scopeDisplay: new FormControl(this.deliveryframework.scopeDisplay),
        startDate: new FormControl(this.deliveryframework.startDate),
        status: new FormControl(this.deliveryframework.status),
        statusDisplay: new FormControl(this.deliveryframework.statusDisplay),
        budgetNotProvided: new FormControl(this.deliveryframework.budgetNotProvided),
        capitalSpend: new FormControl(this.deliveryframework.capitalSpend),
        collaborationType: new FormControl(this.deliveryframework.collaborationType),
        msiatiCollaborationTypedisplay: new FormControl(this.deliveryframework.msiatiCollaborationTypedisplay),
        defaultCurrency: new FormControl(this.deliveryframework.defaultCurrency),
        defaultFinanceType: new FormControl(this.deliveryframework.defaultFinanceType),
        defaultFlowType: new FormControl(this.deliveryframework.defaultFlowType),
        defaultLanguage: new FormControl(this.deliveryframework.defaultLanguage),
        hierarchyLevel: new FormControl(this.deliveryframework.hierarchyLevel),
        humanitarianScope: new FormControl(this.deliveryframework.humanitarianScope),
        account: new FormControl(this.deliveryframework.account),
        utcconversionTimeZoneCode: new FormControl(this.deliveryframework.utcconversionTimeZoneCode),
      });
    } else {
      this.form = new FormGroup({
        ownerIdType: new FormControl(null),
        ownerId: new FormControl(null),
        objectiveId: new FormControl(null),
        parentDeliveryFrameworkId: new FormControl(null),
        defaultTiedStatusId: new FormControl(null),
        iatiactivityId: new FormControl(null),
        scopeId: new FormControl(null),
        createdOn: new FormControl(null),
        createdBy: new FormControl(null),
        modifiedOn: new FormControl(null),
        modifiedBy: new FormControl(null),
        createdOnBehalfBy: new FormControl(null),
        modifiedOnBehalfBy: new FormControl(null),
        overriddenCreatedOn: new FormControl(null),
        importSequenceNumber: new FormControl(null),
        owningBusinessUnit: new FormControl(null),
        owningUser: new FormControl(null),
        owningTeam: new FormControl(null),
        timeZoneRuleVersionNumber: new FormControl(null),
        versionNumber: new FormControl(null),
        stateCode: new FormControl(null),
        stateCodedisplay: new FormControl(null),
        statusCode: new FormControl(null),
        statusCodedisplay: new FormControl(null),
        name: new FormControl(null),
        deliveryFrameworkType: new FormControl(null),
        deliveryFrameworkTypedisplay: new FormControl(null),
        description: new FormControl(null),
        endDate: new FormControl(null),
        goal: new FormControl(null),
        plannedEndDate: new FormControl(null),
        plannedStartDate: new FormControl(null),
        scope: new FormControl(null),
        scopeDisplay: new FormControl(null),
        startDate: new FormControl(null),
        status: new FormControl(null),
        statusDisplay: new FormControl(null),
        budgetNotProvided: new FormControl(null),
        capitalSpend: new FormControl(null),
        collaborationType: new FormControl(null),
        msiatiCollaborationTypedisplay: new FormControl(null),
        defaultCurrency: new FormControl(null),
        defaultFinanceType: new FormControl(null),
        defaultFlowType: new FormControl(null),
        defaultLanguage: new FormControl(null),
        hierarchyLevel: new FormControl(null),
        humanitarianScope: new FormControl(null),
        account: new FormControl(null),
        utcconversionTimeZoneCode: new FormControl(null),
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
      this.deliveryframeworkService.edit(formData).subscribe((res: ResponseApi) => {
        const parent: DeliveryframeworkComponent = this.data['parent'] as DeliveryframeworkComponent;
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
      this.deliveryframeworkService.insert(formData).subscribe((res: ResponseApi) => {
        const parent: DeliveryframeworkComponent = this.data['parent'] as DeliveryframeworkComponent;
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

