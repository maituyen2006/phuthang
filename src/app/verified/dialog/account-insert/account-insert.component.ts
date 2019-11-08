import { Component, OnInit, Inject } from '@angular/core';
import { Account } from 'src/app/class/account';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { AccountComponent } from '../../pages/account/account.component';
import { ResponseApi } from 'src/app/class/response-api';
import { AccountService } from 'src/app/service/account.service';

@Component({
  selector: 'app-account-insert',
  templateUrl: './account-insert.component.html',
  styleUrls: ['./account-insert.component.scss']
})
export class AccountInsertComponent implements OnInit {
  step = 0;
  account: Account = new Account();
  isEdit: boolean;
  form: FormGroup;  
 
  get name() {
    return this.form.get('name');
  }
  get accountNumber() {
    return this.form.get('accountNumber');
  }
  get revenue() {
    return this.form.get('revenue');
  }
  get numberOfEmployees() {
    return this.form.get('numberOfEmployees');
  }
  get description() {
    return this.form.get('description');
  }
  get sic() {
    return this.form.get('sic');
  }
  get ownershipCode() {
    return this.form.get('ownershipCode');
  }
  get marketCap() {
    return this.form.get('marketCap');
  }
  get sharesOutstanding() {
    return this.form.get('sharesOutstanding');
  }
  get stockExchange() {
    return this.form.get('stockExchange');
  }
  get webSiteUrl() {
    return this.form.get('webSiteUrl');
  }
  get ftpSiteUrl() {
    return this.form.get('ftpSiteUrl');
  }
  get address1AddressId() {
    return this.form.get('address1AddressId');
  }
  get address1AddressTypeCode() {
    return this.form.get('address1AddressTypeCode');
  }
  get address1Name() {
    return this.form.get('address1Name');
  }
  get address1PrimaryContactName() {
    return this.form.get('address1PrimaryContactName');
  }
  get address1Line1() {
    return this.form.get('address1Line1');
  }
  get address1Line2() {
    return this.form.get('address1Line2');
  }
  get address1Line3() {
    return this.form.get('address1Line3');
  }
  get address1City() {
    return this.form.get('address1City');
  }
  get address1StateOrProvince() {
    return this.form.get('address1StateOrProvince');
  }
  get address1County() {
    return this.form.get('address1County');
  }
 
  get address1PostOfficeBox() {
    return this.form.get('address1PostOfficeBox');
  }
  get address1PostalCode() {
    return this.form.get('address1PostalCode');
  }
  get address1UTCOffset() {
    return this.form.get('address1UTCOffset');
  }
  get address1UPSZone() {
    return this.form.get('address1UPSZone');
  }
  get address1Telephone1() {
    return this.form.get('address1Telephone1');
  }
  get address1ShippingMethodCode() {
    return this.form.get('address1ShippingMethodCode');
  }
  get address1Telephone2() {
    return this.form.get('address1Telephone2');
  }
  get address1Telephone3() {
    return this.form.get('address1Telephone3');
  }
  get address1Fax() {
    return this.form.get('address1Fax');
  }
  get address1Composite() {
    return this.form.get('address1Composite');
  }

  get address2AddressId() {
    return this.form.get('address2AddressId');
  }

  get address2Name() {
    return this.form.get('address2Name');
  }
  get address2PrimaryContactName() {
    return this.form.get('address2PrimaryContactName');
  }
  get address2Line1() {
    return this.form.get('address2Line1');
  }
  get address2Line2() {
    return this.form.get('address2Line2');
  }
  get address2Line3() {
    return this.form.get('address2Line3');
  }
  get address2City() {
    return this.form.get('address2City');
  }
  get address2StateOrProvince() {
    return this.form.get('address2StateOrProvince');
  }
  get address2County() {
    return this.form.get('address2County');
  }
  get address2PostOfficeBox() {
    return this.form.get('address2PostOfficeBox');
  }
  get address2PostalCode() {
    return this.form.get('address2PostalCode');
  }
  get address2Country() {
    return this.form.get('address2Country');
  }
  get address2UTCOffset() {
    return this.form.get('address2UTCOffset');
  }
  get address2UPSZone() {
    return this.form.get('address2UPSZone');
  }
  get address2Telephone2() {
    return this.form.get('address2Telephone2');
  }
  get address2Telephone3() {
    return this.form.get('address2Telephone3');
  }
  get address2Fax() {
    return this.form.get('address2Fax');
  }
  get address2Composite() {
    return this.form.get('address2Composite');
  }
   get preferredContactMethodCode() {
    return this.form.get('preferredContactMethodCode');
  }
  get eMailAddress1() {
    return this.form.get('eMailAddress1');
  }
  get eMailAddress2() {
    return this.form.get('eMailAddress2');
  }
  get eMailAddress3() {
    return this.form.get('eMailAddress3');
  }
  get telephone1() {
    return this.form.get('telephone1');
  }
  get telephone2() {
    return this.form.get('telephone2');
  }
  get fax() {
    return this.form.get('fax');
  }
  get telephone3() {
    return this.form.get('telephone3');
  }
  get participatesInWorkflow() {
    return this.form.get('participatesInWorkflow');
  }
  get doNotPhone() {
    return this.form.get('doNotPhone');
  }
  get doNotFax() {
    return this.form.get('doNotFax');
  }
  get doNotEMail() {
    return this.form.get('doNotEMail');
  }
  get doNotPostalMail() {
    return this.form.get('doNotPostalMail');
  }
  get doNotBulkEMail() {
    return this.form.get('doNotBulkEMail');
  }
  get doNotBulkPostalMail() {
    return this.form.get('doNotBulkPostalMail');
  }
  get creditOnHold() {
    return this.form.get('creditOnHold');
  }
  get merged() {
    return this.form.get('merged');
  }
  get doNotSendMM() {
    return this.form.get('doNotSendMM');
  }
  get followEmail() {
    return this.form.get('followEmail');
  }

  get marketingOnly() {
    return this.form.get('marketingOnly');
  }
  get statusCode() {
    return this.form.get('statusCode');
  }
  get industryCode() {
    return this.form.get('industryCode');
  }
  get territoryCode() {
    return this.form.get('territoryCode');
  }
  get accountClassificationCode() {
    return this.form.get('accountClassificationCode');
  }
  get businessTypeCode() {
    return this.form.get('businessTypeCode');
  }
  get parentAccountId() {
    return this.form.get('parentAccountId');
  }
  get stateCode() {
    return this.form.get('stateCode');
  }
 
  get lastUsedInCampaign() {
    return this.form.get('lastUsedInCampaign');
  }
  get paymentTermsCode() {
    return this.form.get('paymentTermsCode');
  }
  get shippingMethodCode() {
    return this.form.get('shippingMethodCode');
  }
 
 
  get creditLimit() {
    return this.form.get('creditLimit');
  }
  get masterId() {
    return this.form.get('masterId');
  }
  get exchangeRate() {
    return this.form.get('exchangeRate');
  }
  get transactionCurrencyId() {
    return this.form.get('transactionCurrencyId');
  }
  get preferredAppointmentDayCode() {
    return this.form.get('preferredAppointmentDayCode');
  }
  get preferredSystemUserId() {
    return this.form.get('preferredSystemUserId');
  }
  get preferredAppointmentTimeCode() {
    return this.form.get('preferredAppointmentTimeCode');
  }
  get aging30() {
    return this.form.get('aging30');
  }
  get aging60() {
    return this.form.get('aging60');
  }
  get aging90() {
    return this.form.get('aging90');
  }
  get aging30Base() {
    return this.form.get('aging30Base');
  }
  get aging90Base() {
    return this.form.get('aging90Base');
  }
  get aging60Base() {
    return this.form.get('aging60Base');
  }
  get revenueBase() {
    return this.form.get('revenueBase');
  }
  get marketCapBase() {
    return this.form.get('marketCapBase');
  }
  constructor(private accountService: AccountService,
    @Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    if (this.data['account']) {
      this.account = this.data['account'];
      this.isEdit = true;
      this.form = new FormGroup({
        accountId: new FormControl(this.account.accountId),     
        name: new FormControl(this.account.name, [Validators.required]),
        accountNumber: new FormControl(this.account.accountNumber, [Validators.required]),
        revenue: new FormControl(this.account.revenue),
        numberOfEmployees: new FormControl(this.account.numberOfEmployees),
        description: new FormControl(this.account.description),
        sic: new FormControl(this.account.sic),
        ownershipCode: new FormControl(this.account.ownershipCode),
        marketCap: new FormControl(this.account.marketCap),
        sharesOutstanding: new FormControl(this.account.sharesOutstanding),
        stockExchange: new FormControl(this.account.stockExchange),
        webSiteUrl: new FormControl(this.account.webSiteUrl),
        ftpSiteUrl : new FormControl(this.account.ftpSiteUrl),
        address1AddressId  : new FormControl(this.account.address1AddressId),
        address1AddressTypeCode : new FormControl(this.account.address1AddressTypeCode),
        address1Name : new FormControl(this.account.address1Name),
        address1PrimaryContactName  : new FormControl(this.account.address1PrimaryContactName),
        address1Line1  : new FormControl(this.account.address1Line1),
        address1Line2  : new FormControl(this.account.address1Line2),
        address1Line3 : new FormControl(this.account.address1Line3),
        address1City  : new FormControl(this.account.address1City),
        address1StateOrProvince: new FormControl(this.account.address1StateOrProvince),
        address1County : new FormControl(this.account.address1County),
        address1PostOfficeBox  : new FormControl(this.account.address1PostOfficeBox),
        address1PostalCode : new FormControl(this.account.address1PostalCode),
        address1UTCOffset : new FormControl(this.account.address1UTCOffset),
        address1UPSZone : new FormControl(this.account.address1UPSZone),
        address1Telephone1 : new FormControl(this.account.address1Telephone1),
        address1ShippingMethodCode : new FormControl(this.account.address1ShippingMethodCode),
        address1Telephone2 : new FormControl(this.account.address1Telephone2),
        address1Telephone3 : new FormControl(this.account.address1Telephone3),
        address1Fax : new FormControl(this.account.address1Fax),
        address1Composite: new FormControl(this.account.address1Composite),
        address2AddressId : new FormControl(this.account.address2AddressId),
        address2Name : new FormControl(this.account.address2Name),
        address2PrimaryContactName: new FormControl(this.account.address2PrimaryContactName),
        address2Line1 : new FormControl(this.account.address2Line1),
        address2Line2: new FormControl(this.account.address2Line2),
        address2Line3 : new FormControl(this.account.address2Line3),
        address2City: new FormControl(this.account.address2City),
        address2StateOrProvince : new FormControl(this.account.address2StateOrProvince),
        address2County: new FormControl(this.account.address2County),
        address2PostOfficeBox: new FormControl(this.account.address2PostOfficeBox),
        address2PostalCode : new FormControl(this.account.address2PostalCode),
        address2Country: new FormControl(this.account.address2Country),
        address2UTCOffset : new FormControl(this.account.address2UTCOffset),
        address2UPSZone: new FormControl(this.account.address2UPSZone),
        address2Telephone2: new FormControl(this.account.address2Telephone2),
        address2Telephone3 : new FormControl(this.account.address2Telephone3),
        address2Fax: new FormControl(this.account.address2Fax),
        address2Composite: new FormControl(this.account.address2Composite),
        preferredContactMethodCode: new FormControl(this.account.preferredContactMethodCode),
        eMailAddress1: new FormControl(this.account.eMailAddress1),
        eMailAddress2 : new FormControl(this.account.eMailAddress2),
        eMailAddress3 : new FormControl(this.account.eMailAddress3),
        telephone1: new FormControl(this.account.telephone1),
        telephone2: new FormControl(this.account.telephone2),
        fax : new FormControl(this.account.fax),
        telephone3 : new FormControl(this.account.telephone3),
        participatesInWorkflow: new FormControl(this.account.participatesInWorkflow),
        doNotPhone: new FormControl(this.account.doNotPhone),
        doNotFax: new FormControl(this.account.doNotFax),
        doNotEMail: new FormControl(this.account.doNotEMail),
        doNotPostalMail: new FormControl(this.account.doNotPostalMail),
        doNotBulkEMail: new FormControl(this.account.doNotBulkEMail),
        doNotBulkPostalMail: new FormControl(this.account.doNotBulkPostalMail),
        creditOnHold: new FormControl(this.account.creditOnHold),
        merged : new FormControl(this.account.merged),
        doNotSendMM: new FormControl(this.account.doNotSendMM),
        followEmail : new FormControl(this.account.followEmail),
        marketingOnly: new FormControl(this.account.marketingOnly),
        statusCode : new FormControl(this.account.statusCode),
        industryCode : new FormControl(this.account.industryCode),
        territoryCode : new FormControl(this.account.territoryCode),
        accountClassificationCode : new FormControl(this.account.accountClassificationCode),
        businessTypeCode: new FormControl(this.account.businessTypeCode),
        parentAccountId: new FormControl(this.account.parentAccountId),
        stateCode: new FormControl(this.account.stateCode),
        lastUsedInCampaign : new FormControl(this.account.lastUsedInCampaign),
        paymentTermsCode : new FormControl(this.account.paymentTermsCode),
        shippingMethodCode : new FormControl(this.account.shippingMethodCode),
        creditLimit: new FormControl(this.account.creditLimit),
        masterId: new FormControl(this.account.masterId),
        exchangeRate: new FormControl(this.account.exchangeRate),
        preferredAppointmentDayCode: new FormControl(this.account.preferredAppointmentDayCode),
        transactionCurrencyId: new FormControl(this.account.transactionCurrencyId),
        preferredSystemUserId: new FormControl(this.account.preferredSystemUserId),
        preferredAppointmentTimeCode : new FormControl(this.account.preferredAppointmentTimeCode),
        aging30: new FormControl(this.account.aging30),
        aging60: new FormControl(this.account.aging60),
        aging90: new FormControl(this.account.aging90),
        aging30Base: new FormControl(this.account.aging30Base),
        aging90Base: new FormControl(this.account.aging90Base),
        aging60Base : new FormControl(this.account.aging60Base),
        revenueBase: new FormControl(this.account.revenueBase),
        marketCapBase: new FormControl(this.account.marketCapBase),
        
      });
    }
    else {
      this.form = new FormGroup({
        accountId: new FormControl(this.account.accountId),     
        name: new FormControl(this.account.name, [Validators.required]),
        accountNumber: new FormControl(this.account.accountNumber, [Validators.required]),
        revenue: new FormControl(this.account.revenue),
        numberOfEmployees: new FormControl(this.account.numberOfEmployees),
        description: new FormControl(this.account.description),
        sic: new FormControl(this.account.sic),
        ownershipCode: new FormControl(this.account.ownershipCode),
        marketCap: new FormControl(this.account.marketCap),
        sharesOutstanding: new FormControl(this.account.sharesOutstanding),
        stockExchange: new FormControl(this.account.stockExchange),
        webSiteUrl: new FormControl(this.account.webSiteUrl),
        ftpSiteUrl : new FormControl(this.account.ftpSiteUrl),
        address1AddressId  : new FormControl(this.account.address1AddressId),
        address1AddressTypeCode : new FormControl(this.account.address1AddressTypeCode),
        address1Name : new FormControl(this.account.address1Name),
        address1PrimaryContactName  : new FormControl(this.account.address1PrimaryContactName),
        address1Line1  : new FormControl(this.account.address1Line1),
        address1Line2  : new FormControl(this.account.address1Line2),
        address1Line3 : new FormControl(this.account.address1Line3),
        address1City  : new FormControl(this.account.address1City),
        address1StateOrProvince: new FormControl(this.account.address1StateOrProvince),
        address1County : new FormControl(this.account.address1County),
        address1Country : new FormControl(this.account.address1Country),
        address1PostOfficeBox  : new FormControl(this.account.address1PostOfficeBox),
        address1PostalCode : new FormControl(this.account.address1PostalCode),
        address1UTCOffset : new FormControl(this.account.address1UTCOffset),
        address1UPSZone : new FormControl(this.account.address1UPSZone),
        address1Telephone1 : new FormControl(this.account.address1Telephone1),
        address1ShippingMethodCode : new FormControl(this.account.address1ShippingMethodCode),
        address1Telephone3 : new FormControl(this.account.address1Telephone3),
        address1Fax : new FormControl(this.account.address1Fax),
        address1Composite: new FormControl(this.account.address1Composite),
        address2AddressId : new FormControl(this.account.address2AddressId),
        preferredAppointmentDayCode: new FormControl(this.account.preferredAppointmentDayCode),
        address1Telephone2 : new FormControl(this.account.address1Telephone2),
        address2Name : new FormControl(this.account.address2Name),
        address2PrimaryContactName: new FormControl(this.account.address2PrimaryContactName),
        address2Line1 : new FormControl(this.account.address2Line1),
        address2Line2: new FormControl(this.account.address2Line2),
        address2Line3 : new FormControl(this.account.address2Line3),
        address2City: new FormControl(this.account.address2City),
        address2StateOrProvince : new FormControl(this.account.address2StateOrProvince),
        address2County: new FormControl(this.account.address2County),
        address2PostOfficeBox: new FormControl(this.account.address2PostOfficeBox),
        address2PostalCode : new FormControl(this.account.address2PostalCode),
        address2Country: new FormControl(this.account.address2Country),
        address2UTCOffset : new FormControl(this.account.address2UTCOffset),
        address2UPSZone: new FormControl(this.account.address2UPSZone),
        address2Telephone2: new FormControl(this.account.address2Telephone2),
        address2Telephone3 : new FormControl(this.account.address2Telephone3),
        address2Fax: new FormControl(this.account.address2Fax),
        address2Composite: new FormControl(this.account.address2Composite),
        preferredContactMethodCode: new FormControl(this.account.preferredContactMethodCode),
        eMailAddress1: new FormControl(this.account.eMailAddress1),
        eMailAddress2 : new FormControl(this.account.eMailAddress2),
        eMailAddress3 : new FormControl(this.account.eMailAddress3),
        telephone1: new FormControl(this.account.telephone1),
        telephone2: new FormControl(this.account.telephone2),
        fax : new FormControl(this.account.fax),
        telephone3 : new FormControl(this.account.telephone3),
        participatesInWorkflow: new FormControl(this.account.participatesInWorkflow),
        doNotPhone: new FormControl(this.account.doNotPhone),
        doNotFax: new FormControl(this.account.doNotFax),
        doNotEMail: new FormControl(this.account.doNotEMail),
        doNotPostalMail: new FormControl(this.account.doNotPostalMail),
        doNotBulkEMail: new FormControl(this.account.doNotBulkEMail),
        doNotBulkPostalMail: new FormControl(this.account.doNotBulkPostalMail),
        creditOnHold: new FormControl(this.account.creditOnHold),
        merged : new FormControl(this.account.merged),
        doNotSendMM: new FormControl(this.account.doNotSendMM),
        followEmail : new FormControl(this.account.followEmail),
        marketingOnly: new FormControl(this.account.marketingOnly),
        statusCode : new FormControl(this.account.statusCode),
        industryCode : new FormControl(this.account.industryCode),
        territoryCode : new FormControl(this.account.territoryCode),
        accountClassificationCode : new FormControl(this.account.accountClassificationCode),
        businessTypeCode: new FormControl(this.account.businessTypeCode),
        parentAccountId: new FormControl(this.account.parentAccountId),
        stateCode: new FormControl(this.account.stateCode),
        lastUsedInCampaign : new FormControl(this.account.lastUsedInCampaign),
        paymentTermsCode : new FormControl(this.account.paymentTermsCode),
        shippingMethodCode : new FormControl(this.account.shippingMethodCode),
        creditLimit: new FormControl(this.account.creditLimit),
        masterId: new FormControl(this.account.masterId),
        exchangeRate: new FormControl(this.account.exchangeRate),
        transactionCurrencyId: new FormControl(this.account.transactionCurrencyId),
        preferredSystemUserId: new FormControl(this.account.preferredSystemUserId),
        preferredAppointmentTimeCode : new FormControl(this.account.preferredAppointmentTimeCode),
        aging30: new FormControl(this.account.aging30),
        aging60: new FormControl(this.account.aging60),
        aging90: new FormControl(this.account.aging90),
        aging30Base: new FormControl(this.account.aging30Base),
        aging90Base: new FormControl(this.account.aging90Base),
        aging60Base : new FormControl(this.account.aging60Base),
        revenueBase: new FormControl(this.account.revenueBase),
        marketCapBase: new FormControl(this.account.marketCapBase),
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
      this.accountService.edit(formData).subscribe((res: ResponseApi) => {
        const parent: AccountComponent = this.data['parent'] as AccountComponent;
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
      formData.parentId = this.data['parentID'];
      this.accountService.insert(formData).subscribe((res: ResponseApi) => {
        const parent: AccountComponent = this.data['parent'] as AccountComponent;
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
    }
  }
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }


}


