import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { DeliveryFrameworkDescription } from "src/app/class/delivery-framework-description";
import { DeliveryFrameworkDescriptionService } from "../../../service/delivery-framework-description.service";
import { DeliveryFrameworkDescriptionComponent } from "src/app/verified/pages/delivery-framework-description/delivery-framework-description.component";
import { Md5 } from "ts-md5";
import { ResponseApi } from "src/app/class/response-api";
import { from } from "rxjs";
import { Deliveryframework } from 'src/app/class/deliveryframework';
import { DeliveryframeworkService } from 'src/app/service/deliveryframework.service';
import { startWith, map } from 'rxjs/operators';
@Component({
  selector: "app-delivery-framework-description-insert",
  templateUrl: "./delivery-framework-description-insert.component.html",
  styleUrls: ["./delivery-framework-description-insert.component.scss"]
})
export class DeliveryFrameworkDescriptionInsertComponent implements OnInit {
  deliveryFrameworkDescription: DeliveryFrameworkDescription = new DeliveryFrameworkDescription();
  deliveryFrameworks: Deliveryframework[] = [];
  filteredDeliveryFramework;
  isEdit: boolean;
  result = false;
  form: FormGroup;
  deliveryFrameworkInput = new FormControl(null, [Validators.required]);

  get createdOn() {
    return this.form.get("createdOn");
  }
  get createdBy() {
    return this.form.get("createdBy");
  }
  get modifiedOn() {
    return this.form.get("modifiedOn");
  }
  get modifiedBy() {
    return this.form.get("modifiedBy");
  }
  get createdOnBehalfBy() {
    return this.form.get("createdOnBehalfBy");
  }
  get modifiedOnBehalfBy() {
    return this.form.get("modifiedOnBehalfBy");
  }
  get overriddenCreatedOn() {
    return this.form.get("overriddenCreatedOn");
  }
  get importSequenceNumber() {
    return this.form.get("importSequenceNumber");
  }
  get ownerIdType() {
    return this.form.get("ownerIdType");
  }
  get ownerId() {
    return this.form.get("ownerId");
  }
  get owningBusinessUnit() {
    return this.form.get("owningBusinessUnit");
  }
  get owningUser() {
    return this.form.get("owningUser");
  }
  get owningTeam() {
    return this.form.get("owningTeam");
  }
  get timeZoneRuleVersionNumber() {
    return this.form.get("timeZoneRuleVersionNumber");
  }
  get versionNumber() {
    return this.form.get("versionNumber");
  }
  get stateCode() {
    return this.form.get("stateCode");
  }
  get stateCodedisplay() {
    return this.form.get("stateCodedisplay");
  }
  get statusCode() {
    return this.form.get("statusCode");
  }
  get statusCodedisplay() {
    return this.form.get("statusCodedisplay");
  }
  get name() {
    return this.form.get("name");
  }
  get deliveryFrameworkId() {
    return this.form.get("deliveryFrameworkId");
  }
  get description() {
    return this.form.get("description");
  }
  get typeId() {
    return this.form.get("typeId");
  }
  get utcconversionTimeZoneCode() {
    return this.form.get("utcconversionTimeZoneCode");
  }

  constructor(
    private deliveryFrameworkDescriptionService: DeliveryFrameworkDescriptionService,
    private deliveryFrameworkService: DeliveryframeworkService,
    public dialogRef: MatDialogRef<DeliveryFrameworkDescriptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    if (this.data.deliveryFrameworkDescription) {
      this.deliveryFrameworkDescription = this.data.deliveryFrameworkDescription;
      this.isEdit = true;
      this.form = new FormGroup({
        deliveryFrameworkDescriptionId: new FormControl(this.deliveryFrameworkDescription.deliveryFrameworkDescriptionId,
          [Validators.required]
        ),
        createdOn: new FormControl(this.deliveryFrameworkDescription.createdOn),
        createdBy: new FormControl(this.deliveryFrameworkDescription.createdBy),
        modifiedOn: new FormControl(
          this.deliveryFrameworkDescription.modifiedOn,
          [Validators.required]
        ),
        modifiedBy: new FormControl(
          this.deliveryFrameworkDescription.modifiedBy
        ),
        createdOnBehalfBy: new FormControl(
          this.deliveryFrameworkDescription.createdOnBehalfBy
        ),
        modifiedOnBehalfBy: new FormControl(
          this.deliveryFrameworkDescription.modifiedOnBehalfBy
        ),
        overriddenCreatedOn: new FormControl(
          this.deliveryFrameworkDescription.overriddenCreatedOn
        ),
        importSequenceNumber: new FormControl(
          this.deliveryFrameworkDescription.importSequenceNumber
        ),
        ownerIdType: new FormControl(
          this.deliveryFrameworkDescription.ownerIdType
        ),
        ownerId: new FormControl(this.deliveryFrameworkDescription.ownerId),
        owningBusinessUnit: new FormControl(
          this.deliveryFrameworkDescription.owningBusinessUnit
        ),
        owningUser: new FormControl(
          this.deliveryFrameworkDescription.owningUser
        ),
        owningTeam: new FormControl(
          this.deliveryFrameworkDescription.owningTeam
        ),
        timeZoneRuleVersionNumber: new FormControl(
          this.deliveryFrameworkDescription.timeZoneRuleVersionNumber
        ),
        versionNumber: new FormControl(
          this.deliveryFrameworkDescription.versionNumber
        ),
        stateCode: new FormControl(this.deliveryFrameworkDescription.stateCode),
        stateCodedisplay: new FormControl(
          this.deliveryFrameworkDescription.stateCodedisplay
        ),
        statusCode: new FormControl(
          this.deliveryFrameworkDescription.statusCode
        ),
        statusCodedisplay: new FormControl(
          this.deliveryFrameworkDescription.statusCodedisplay
        ),
        name: new FormControl(this.deliveryFrameworkDescription.name),
        deliveryFrameworkId: new FormControl(
          this.deliveryFrameworkDescription.deliveryFrameworkId,
          [Validators.required]
        ),
        description: new FormControl(
          this.deliveryFrameworkDescription.description
        ),
        typeId: new FormControl(this.deliveryFrameworkDescription.typeId),
        utcconversionTimeZoneCode: new FormControl(
          this.deliveryFrameworkDescription.utcconversionTimeZoneCode
        )
      });
    } else {
      this.form = new FormGroup({
        createdOn: new FormControl(this.deliveryFrameworkDescription.createdOn),
        createdBy: new FormControl(this.deliveryFrameworkDescription.createdBy),
        modifiedOn: new FormControl(
          this.deliveryFrameworkDescription.modifiedOn
        ),
        modifiedBy: new FormControl(
          this.deliveryFrameworkDescription.modifiedBy
        ),
        createdOnBehalfBy: new FormControl(
          this.deliveryFrameworkDescription.createdOnBehalfBy
        ),
        modifiedOnBehalfBy: new FormControl(
          this.deliveryFrameworkDescription.modifiedOnBehalfBy
        ),
        overriddenCreatedOn: new FormControl(
          this.deliveryFrameworkDescription.overriddenCreatedOn
        ),
        importSequenceNumber: new FormControl(
          this.deliveryFrameworkDescription.importSequenceNumber
        ),
        ownerIdType: new FormControl(
          this.deliveryFrameworkDescription.ownerIdType
        ),
        ownerId: new FormControl(this.deliveryFrameworkDescription.ownerId),
        owningBusinessUnit: new FormControl(
          this.deliveryFrameworkDescription.owningBusinessUnit
        ),
        owningUser: new FormControl(
          this.deliveryFrameworkDescription.owningUser
        ),
        owningTeam: new FormControl(
          this.deliveryFrameworkDescription.owningTeam
        ),
        timeZoneRuleVersionNumber: new FormControl(
          this.deliveryFrameworkDescription.timeZoneRuleVersionNumber
        ),
        versionNumber: new FormControl(
          this.deliveryFrameworkDescription.versionNumber
        ),
        stateCode: new FormControl(this.deliveryFrameworkDescription.stateCode),
        stateCodedisplay: new FormControl(
          this.deliveryFrameworkDescription.stateCodedisplay
        ),
        statusCode: new FormControl(
          this.deliveryFrameworkDescription.statusCode
        ),
        statusCodedisplay: new FormControl(
          this.deliveryFrameworkDescription.statusCodedisplay
        ),
        name: new FormControl(this.deliveryFrameworkDescription.name),
        deliveryFrameworkId: new FormControl(
          this.deliveryFrameworkDescription.deliveryFrameworkId
        ),
        description: new FormControl(
          this.deliveryFrameworkDescription.description
        ),
        typeId: new FormControl(this.deliveryFrameworkDescription.typeId),
        utcconversionTimeZoneCode: new FormControl(
          this.deliveryFrameworkDescription.utcconversionTimeZoneCode
        )
      });
    }
    this.deliveryFrameworkService.paging().subscribe((res: ResponseApi) => {
      this.deliveryFrameworks = res.data;
      this.filteredDeliveryFramework = this.deliveryFrameworkInput.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterC(value))
        );
    });
  }

  private _filterC(value: string) {
    const filterValue = value.toLowerCase();
    return this.deliveryFrameworks.filter(deliveryFramework => {
      return (deliveryFramework['name'] && deliveryFramework['name'].toLowerCase().includes(filterValue));
    });
  }

  getErrorMessage(input: any) {
    return "Vui lòng nhập trường này";
  }
  // getErrorMessageId(input: any) {
  //   return 'Vui lòng nhập trường ID';
  // }
  // getErrorMessageName(input: any) {
  //   return 'Vui lòng nhập tên';
  // }
  onSubmit(form: FormGroup): void {
    if (form.invalid) {
      return;
    }
    const formData = this.form.value;
    if (this.isEdit) {
      this.deliveryFrameworkDescriptionService
        .edit(formData)
        .subscribe((res: ResponseApi) => {
          const parent: DeliveryFrameworkDescriptionComponent = this.data[
            "parent"
          ] as DeliveryFrameworkDescriptionComponent;
          if (res.success) {
            this.snackBar.open(res.message, "Đóng", {
              panelClass: ["style-success"],
              duration: 2500
            });
          } else {
            this.snackBar.open(res.message, "Đóng", {
              panelClass: ["style-error"],
              duration: 2500
            });
          }
          parent.paging();
        });
    } else {
      if (formData["password"]) {
        formData["password"] = new Md5().appendStr(formData["password"]).end();
      }
      this.deliveryFrameworkDescriptionService
        .insert(formData)
        .subscribe((res: ResponseApi) => {
          const parent: DeliveryFrameworkDescriptionComponent = this.data[
            "parent"
          ] as DeliveryFrameworkDescriptionComponent;
          if (res.success) {
            this.snackBar.open(res["message"], "Đóng", {
              panelClass: ["style-success"],
              duration: 2500
            });
          } else {
            this.snackBar.open(res["message"], "Đóng", {
              panelClass: ["style-error"],
              duration: 2500
            });
          }
          parent.paging();
        });
    }
  }
  step = 0;

  setStep(index: number) {
    this.step = index;
  }


  // nextStep1(step1) {
    
  //   if (this.form.valid) {
  //     return this.step++;
  //   }
  //   return false;
    
  // }
  // nextStep2(step2) {
    
  //   if (this.form.invalid) {
  //     return this.step++;
  //   }
  //   return false;
    
  // }

  nextStep() {
      return this.step++;
  }
  prevStep() {
    this.step--;
  }
}
