import { Component, OnInit, Inject } from '@angular/core';
import { InvoiceProduct } from 'src/app/class/invoice-product';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { InvoiceProductService } from 'src/app/service/invoice-product.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ResponseApi } from 'src/app/class/response-api';
import { InvoiceProductComponent } from '../../pages/invoice-product/invoice-product.component';
import { InvoiceService } from 'src/app/service/invoice.service';
import { Invoice } from 'src/app/class/invoice';


@Component({
  selector: 'app-invoice-product-insert',
  templateUrl: './invoice-product-insert.component.html',
  styleUrls: ['./invoice-product-insert.component.scss']
})
export class InvoiceProductInsertComponent implements OnInit {
  invoiceProduct: InvoiceProduct = new InvoiceProduct();
  invoices: Invoice[] = [];
  isEdit: boolean;

  form: FormGroup;
  get createdOn() {
    return this.form.get('createdOn');
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
  get ownerId() {
    return this.form.get('ownerId');
  }
  get owningBusinessUnit() {
    return this.form.get('owningBusinessUnit');
  }
  get owningUser() {
    return this.form.get('owningUser')
  }
  get owningTeam() {
    return this.form.get('owningTeam')
  }
  get timeZoneRuleVersionNumber() {
    return this.form.get('timeZoneRuleVersionNumber')
  }
  get versionNumber() {
    return this.form.get('versionNumber')
  }
  get invoiceDetailId() {
    return this.form.get('invoiceDetailId')
  }
  get actualDeliveryOn() {
    return this.form.get('actualDeliveryOn')
  }
  get baseAmount() {
    return this.form.get('baseAmount')
  }
  get transactionCurrencyId() {
    return this.form.get('transactionCurrencyId')
  }
  get exchangeRate() {
    return this.form.get('exchangeRate')
  }
  get baseAmountBase() {
    return this.form.get('baseAmountBase')
  }
  get description() {
    return this.form.get('description')
  }
  get extendedAmount() {
    return this.form.get('extendedAmount')
  }
  get extendedAmountBase() {
    return this.form.get('extendedAmountBase')
  }
  get invoiceIsPriceLocked() {
    return this.form.get('invoiceIsPriceLocked')
  }
  get invoiceStateCode() {
    return this.form.get('invoiceStateCode')
  }
  get invoiceStateCodedisplay() {
    return this.form.get('invoiceStateCodedisplay')
  }
  get isCopied() {
    return this.form.get('isCopied')
  }
  get isPriceOverridden() {
    return this.form.get('isPriceOverridden')
  }
  get isProductOverridden() {
    return this.form.get('isProductOverridden')
  }
  get lineItemNumber() {
    return this.form.get('lineItemNumber')
  }
  get manualDiscountAmount() {
    return this.form.get('manualDiscountAmount')
  }
  get manualDiscountAmountBase() {
    return this.form.get('manualDiscountAmountBase')
  }
  get parentBundleId() {
    return this.form.get('parentBundleId')
  }
  get productAssociationId() {
    return this.form.get('productAssociationId')
  }
  get productTypeCode() {
    return this.form.get('productTypeCode')
  }
  get productTypeCodedisplay() {
    return this.form.get('productTypeCodedisplay')
  }
  get pricePerUnit() {
    return this.form.get('pricePerUnit')
  }
  get pricePerUnitBase() {
    return this.form.get('pricePerUnitBase')
  }
  get pricingErrorCode() {
    return this.form.get('pricingErrorCode')
  }
  get pricingErrorCodedisplay() {
    return this.form.get('pricingErrorCodedisplay')
  }
  get productDescription() {
    return this.form.get('productDescription')
  }
  get productId() {
    return this.form.get('productId')
  }
  get quantity() {
    return this.form.get('quantity')
  }
  get quantityBackordered() {
    return this.form.get('quantityBackordered')
  }
  get quantityCancelled() {
    return this.form.get('quantityCancelled')
  }
  get quantityShipped() {
    return this.form.get('quantityShipped')
  }
  get salesRepId() {
    return this.form.get('salesRepId')
  }
  get shippingTrackingNumber() {
    return this.form.get('shippingTrackingNumber')
  }
  get shipToCity() {
    return this.form.get('shipToCity')
  }
  get shipToCountry() {
    return this.form.get('shipToCountry')
  }
  get shipToFax() {
    return this.form.get('shipToFax')
  }
  get shipToFreightTermsCode() {
    return this.form.get('shipToFreightTermsCode')
  }
  get shipToFreightTermsCodedisplay() {
    return this.form.get('shipToFreightTermsCodedisplay')
  }
  get shipToLine1() {
    return this.form.get('shipToLine1')
  }
  get shipToLine2() {
    return this.form.get('shipToLine2')
  }
  get shipToLine3() {
    return this.form.get('shipToLine3')
  }
  get shipToName() {
    return this.form.get('shipToName')
  }
  get shipToPostalCode() {
    return this.form.get('shipToPostalCode')
  }
  get shipToStateOrProvince() {
    return this.form.get('shipToStateOrProvince')
  }
  get shipToTelephone() {
    return this.form.get('shipToTelephone')
  }
  get tax() {
    return this.form.get('tax')
  }
  get taxBase() {
    return this.form.get('taxBase')
  }
  get uoMId() {
    return this.form.get('uoMId')
  }
  get volumeDiscountAmount() {
    return this.form.get('volumeDiscountAmount')
  }
  get volumeDiscountAmountBase() {
    return this.form.get('volumeDiscountAmountBase')
  }
  get willCall() {
    return this.form.get('willCall')
  }
  get sequenceNumber() {
    return this.form.get('sequenceNumber')
  }
  get propertyConfigurationStatus() {
    return this.form.get('propertyConfigurationStatus')
  }
  get propertyConfigurationStatusdisplay() {
    return this.form.get('propertyConfigurationStatusdisplay')
  }
  get invoiceDetailName() {
    return this.form.get('invoiceDetailName')
  }
  get salesOrderDetailId() {
    return this.form.get('salesOrderDetailId')
  }
  get parentBundleIdRef() {
    return this.form.get('parentBundleIdRef')
  }
  get billingMethod() {
    return this.form.get('billingMethod')
  }
  get billingMethoddisplay() {
    return this.form.get('billingMethoddisplay')
  }
  get chargeableAmount() {
    return this.form.get('chargeableAmount')
  }
  get chargeableAmountBase() {
    return this.form.get('chargeableAmountBase')
  }
  get complimentaryAmount() {
    return this.form.get('complimentaryAmount')
  }
  get complimentaryAmountBase() {
    return this.form.get('complimentaryAmountBase')
  }
  get contractLine() {
    return this.form.get('contractLine')
  }
  get contractLineAmount() {
    return this.form.get('contractLineAmount')
  }
  get contractLineAmountBase() {
    return this.form.get('contractLineAmountBase')
  }
  get invoicedTillDate() {
    return this.form.get('invoicedTillDate')
  }
  get invoicedTillDateBase() {
    return this.form.get('invoicedTillDateBase')
  }
  get nonChargeableAmount() {
    return this.form.get('nonChargeableAmount')
  }
  get nonChargeableAmountBase() {
    return this.form.get('nonChargeableAmountBase')
  }
  get project() {
    return this.form.get('project')
  }
  get utcconversionTimeZoneCode() {
    return this.form.get('utcconversionTimeZoneCode')
  }
  get productName() {
    return this.form.get('productName');
  }
  get invoiceId() {
    return this.form.get('invoiceId');
  }
  get createdBy() {
    return this.form.get('createdBy');
  }
  get ownerIdType(){
    return this.form.get('ownerIdType');
  }

  constructor(private invoiceproductService: InvoiceProductService,
    private invoiceService: InvoiceService,
    public dialogRef: MatDialogRef<InvoiceProductInsertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar) { }

  ngOnInit() {

    if (this.data['invoiceProduct']) {
      this.invoiceProduct = this.data['invoiceProduct'];
      this.isEdit = true;
      this.form = new FormGroup({
        invoiceProductID: new FormControl(this.invoiceProduct.invoiceProductID),
        modifiedOn: new FormControl(this.invoiceProduct.modifiedOn),
        ownerIdType: new FormControl(this.invoiceProduct.ownerIdType),
        overriddenCreatedOn: new FormControl(this.invoiceProduct.overriddenCreatedOn),
        modifiedOnBehalfBy: new FormControl(this.invoiceProduct.modifiedOnBehalfBy),
        modifiedBy: new FormControl(this.invoiceProduct.modifiedBy),
        importSequenceNumber: new FormControl(this.invoiceProduct.importSequenceNumber),
        createdOn: new FormControl(this.invoiceProduct.createdOn),
        createdOnBehalfBy: new FormControl(this.invoiceProduct.createdOnBehalfBy),
        productName: new FormControl(this.invoiceProduct.productName),
        createdBy: new FormControl(this.invoiceProduct.createdBy),
        invoiceId: new FormControl(this.invoiceProduct.invoiceId, [Validators.required]),
        ownerId: new FormControl(this.invoiceProduct.ownerId),
        owningBusinessUnit: new FormControl(this.invoiceProduct.owningBusinessUnit),
        owningUser: new FormControl(this.invoiceProduct.owningUser),
        owningTeam: new FormControl(this.invoiceProduct.owningTeam),
        timeZoneRuleVersionNumber: new FormControl(this.invoiceProduct.timeZoneRuleVersionNumber),
        versionNumber: new FormControl(this.invoiceProduct.versionNumber),
        invoiceDetailId: new FormControl(this.invoiceProduct.invoiceDetailId),
        actualDeliveryOn: new FormControl(this.invoiceProduct.actualDeliveryOn),
        baseAmount: new FormControl(this.invoiceProduct.baseAmount),
        transactionCurrencyId: new FormControl(this.invoiceProduct.transactionCurrencyId),
        exchangeRate: new FormControl(this.invoiceProduct.exchangeRate),
        baseAmountBase: new FormControl(this.invoiceProduct.baseAmountBase),
        description: new FormControl(this.invoiceProduct.description),
        extendedAmount: new FormControl(this.invoiceProduct.extendedAmount),
        extendedAmountBase: new FormControl(this.invoiceProduct.extendedAmountBase),
        invoiceIsPriceLocked: new FormControl(this.invoiceProduct.invoiceIsPriceLocked),
        invoiceStateCode: new FormControl(this.invoiceProduct.invoiceStateCode),
        invoiceStateCodedisplay: new FormControl(this.invoiceProduct.invoiceStateCodedisplay),
        isCopied: new FormControl(this.invoiceProduct.isCopied),
        isPriceOverridden: new FormControl(this.invoiceProduct.isPriceOverridden),
        isProductOverridden: new FormControl(this.invoiceProduct.isProductOverridden),
        lineItemNumber: new FormControl(this.invoiceProduct.lineItemNumber),
        manualDiscountAmount: new FormControl(this.invoiceProduct.manualDiscountAmount),
        manualDiscountAmountBase: new FormControl(this.invoiceProduct.manualDiscountAmountBase),
        parentBundleId: new FormControl(this.invoiceProduct.parentBundleId),
        productAssociationId: new FormControl(this.invoiceProduct.productAssociationId),
        productTypeCode: new FormControl(this.invoiceProduct.productTypeCode),
        productTypeCodedisplay: new FormControl(this.invoiceProduct.productTypeCodedisplay),
        pricePerUnit: new FormControl(this.invoiceProduct.pricePerUnit),
        pricePerUnitBase: new FormControl(this.invoiceProduct.pricePerUnitBase),
        pricingErrorCode: new FormControl(this.invoiceProduct.pricingErrorCode),
        pricingErrorCodedisplay: new FormControl(this.invoiceProduct.pricingErrorCodedisplay),
        productDescription: new FormControl(this.invoiceProduct.productDescription),
        productId: new FormControl(this.invoiceProduct.productId),
        quantity: new FormControl(this.invoiceProduct.quantity),
        quantityBackordered: new FormControl(this.invoiceProduct.quantityBackordered),
        quantityCancelled: new FormControl(this.invoiceProduct.quantityCancelled),
        quantityShipped: new FormControl(this.invoiceProduct.quantityShipped),
        salesRepId: new FormControl(this.invoiceProduct.salesRepId),
        shippingTrackingNumber: new FormControl(this.invoiceProduct.shippingTrackingNumber),
        shipToCity: new FormControl(this.invoiceProduct.shipToCity),
        shipToCountry: new FormControl(this.invoiceProduct.shipToCountry),
        shipToFax: new FormControl(this.invoiceProduct.shipToFax),
        shipToFreightTermsCode: new FormControl(this.invoiceProduct.shipToFreightTermsCode),
        shipToFreightTermsCodedisplay: new FormControl(this.invoiceProduct.shipToFreightTermsCodedisplay),
        shipToLine1: new FormControl(this.invoiceProduct.shipToLine1),
        shipToLine2: new FormControl(this.invoiceProduct.shipToLine2),
        shipToLine3: new FormControl(this.invoiceProduct.shipToLine3),
        shipToName: new FormControl(this.invoiceProduct.shipToName),
        shipToPostalCode: new FormControl(this.invoiceProduct.shipToPostalCode),
        shipToStateOrProvince: new FormControl(this.invoiceProduct.shipToStateOrProvince),
        shipToTelephone: new FormControl(this.invoiceProduct.shipToTelephone),
        tax: new FormControl(this.invoiceProduct.tax),
        taxBase: new FormControl(this.invoiceProduct.taxBase),
        uoMId: new FormControl(this.invoiceProduct.uoMId),
        volumeDiscountAmount: new FormControl(this.invoiceProduct.volumeDiscountAmount),
        volumeDiscountAmountBase: new FormControl(this.invoiceProduct.volumeDiscountAmountBase),
        willCall: new FormControl(this.invoiceProduct.willCall),
        sequenceNumber: new FormControl(this.invoiceProduct.sequenceNumber),
        propertyConfigurationStatus: new FormControl(this.invoiceProduct.propertyConfigurationStatus),
        propertyConfigurationStatusdisplay: new FormControl(this.invoiceProduct.propertyConfigurationStatusdisplay),
        invoiceDetailName: new FormControl(this.invoiceProduct.invoiceDetailName),
        salesOrderDetailId: new FormControl(this.invoiceProduct.salesOrderDetailId),
        parentBundleIdRef: new FormControl(this.invoiceProduct.parentBundleIdRef),
        billingMethod: new FormControl(this.invoiceProduct.billingMethod),
        billingMethoddisplay: new FormControl(this.invoiceProduct.billingMethoddisplay),
        chargeableAmount: new FormControl(this.invoiceProduct.chargeableAmount),
        chargeableAmountBase: new FormControl(this.invoiceProduct.chargeableAmountBase),
        complimentaryAmount: new FormControl(this.invoiceProduct.complimentaryAmount),
        complimentaryAmountBase: new FormControl(this.invoiceProduct.complimentaryAmountBase),
        contractLine: new FormControl(this.invoiceProduct.contractLine),
        contractLineAmount: new FormControl(this.invoiceProduct.contractLineAmount),
        contractLineAmountBase: new FormControl(this.invoiceProduct.contractLineAmountBase),
        invoicedTillDate: new FormControl(this.invoiceProduct.invoicedTillDate),
        invoicedTillDateBase: new FormControl(this.invoiceProduct.invoicedTillDateBase),
        nonChargeableAmount: new FormControl(this.invoiceProduct.nonChargeableAmount),
        nonChargeableAmountBase: new FormControl(this.invoiceProduct.nonChargeableAmountBase),
        project: new FormControl(this.invoiceProduct.project),
        utcconversionTimeZoneCode: new FormControl(this.invoiceProduct.utcconversionTimeZoneCode),
      });
    } else {
      this.form = new FormGroup({
        modifiedOn: new FormControl(null),
        ownerIdType: new FormControl(null),
        createdOnBehalfBy: new FormControl(null),
        overriddenCreatedOn: new FormControl(null),
        modifiedOnBehalfBy: new FormControl(null),
        modifiedBy: new FormControl(null),
        importSequenceNumber: new FormControl(null),
        createdOn: new FormControl(null),
        productName: new FormControl(null),
        createdBy: new FormControl(null),
        invoiceId: new FormControl(null, [Validators.required]),
        ownerId: new FormControl(null),
        owningBusinessUnit: new FormControl(null),
        owningUser: new FormControl(null),
        owningTeam: new FormControl(null),
        timeZoneRuleVersionNumber: new FormControl(null),
        versionNumber: new FormControl(null),
        invoiceDetailId: new FormControl(null),
        actualDeliveryOn: new FormControl(null),
        baseAmount: new FormControl(null),
        transactionCurrencyId: new FormControl(null),
        exchangeRate: new FormControl(null),
        baseAmountBase: new FormControl(null),
        description: new FormControl(null),
        extendedAmount: new FormControl(null),
        extendedAmountBase: new FormControl(null),
        invoiceIsPriceLocked: new FormControl(null),
        invoiceStateCode: new FormControl(null),
        invoiceStateCodedisplay: new FormControl(null),
        isCopied: new FormControl(null),
        isPriceOverridden: new FormControl(null),
        isProductOverridden: new FormControl(null),
        lineItemNumber: new FormControl(null),
        manualDiscountAmount: new FormControl(null),
        manualDiscountAmountBase: new FormControl(null),
        parentBundleId: new FormControl(null),
        productAssociationId: new FormControl(null),
        productTypeCode: new FormControl(null),
        productTypeCodedisplay: new FormControl(null),
        pricePerUnit: new FormControl(null),
        pricePerUnitBase: new FormControl(null),
        pricingErrorCode: new FormControl(null),
        pricingErrorCodedisplay: new FormControl(null),
        productDescription: new FormControl(null),
        productId: new FormControl(null),
        quantity: new FormControl(null),
        quantityBackordered: new FormControl(null),
        quantityCancelled: new FormControl(null),
        quantityShipped: new FormControl(null),
        salesRepId: new FormControl(null),
        shippingTrackingNumber: new FormControl(null),
        shipToCity: new FormControl(null),
        shipToCountry: new FormControl(null),
        shipToFax: new FormControl(null),
        shipToFreightTermsCode: new FormControl(null),
        shipToFreightTermsCodedisplay: new FormControl(null),
        shipToLine1: new FormControl(null),
        shipToLine2: new FormControl(null),
        shipToLine3: new FormControl(null),
        shipToName: new FormControl(null),
        shipToPostalCode: new FormControl(null),
        shipToStateOrProvince: new FormControl(null),
        shipToTelephone: new FormControl(null),
        tax: new FormControl(null),
        taxBase: new FormControl(null),
        uoMId: new FormControl(null),
        volumeDiscountAmount: new FormControl(null),
        volumeDiscountAmountBase: new FormControl(null),
        willCall: new FormControl(null),
        sequenceNumber: new FormControl(null),
        propertyConfigurationStatus: new FormControl(null),
        propertyConfigurationStatusdisplay: new FormControl(null),
        invoiceDetailName: new FormControl(null),
        salesOrderDetailId: new FormControl(null),
        parentBundleIdRef: new FormControl(null),
        billingMethod: new FormControl(null),
        billingMethoddisplay: new FormControl(null),
        chargeableAmount: new FormControl(null),
        chargeableAmountBase: new FormControl(null),
        complimentaryAmount: new FormControl(null),
        complimentaryAmountBase: new FormControl(null),
        contractLine: new FormControl(null),
        contractLineAmount: new FormControl(null),
        contractLineAmountBase: new FormControl(null),
        invoicedTillDate: new FormControl(null),
        invoicedTillDateBase: new FormControl(null),
        nonChargeableAmount: new FormControl(null),
        nonChargeableAmountBase: new FormControl(null),
        project: new FormControl(null),
        utcconversionTimeZoneCode: new FormControl(null),
      });
    }
    this.invoiceService.findAllAvaiable().subscribe((res: ResponseApi) => {
      this.invoices = res.data;
    });
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
      this.invoiceproductService.edit(formData).subscribe((res: ResponseApi) => {
        const parent: InvoiceProductComponent = this.data['parent'] as InvoiceProductComponent;
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
      this.invoiceproductService.insert(formData).subscribe((res: ResponseApi) => {
        const parent: InvoiceProductComponent = this.data['parent'] as InvoiceProductComponent;
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
