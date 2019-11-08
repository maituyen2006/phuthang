import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { MaterialModule } from '../shared/material.module';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { RouterModule } from '@angular/router';
import { AdminInsertComponent } from './dialog/admin-insert/admin-insert.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PersonnelComponent } from './pages/personnel/personnel.component';
import { DefaultComponent } from './pages/default/default.component';
import { ModuleComponent } from './pages/module/module.component';
import { AdminModuleInsertComponent } from './dialog/admin-module-insert/admin-module-insert.component';
import { RolesComponent } from './pages/roles/roles.component';
import { AdminRoleInsertComponent } from './dialog/admin-role-insert/admin-role-insert.component';
import { AdminRolePermissionComponent } from './dialog/admin-role-permission/admin-role-permission.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import localeVi from '@angular/common/locales/vi';
import { ConfirmComponent } from './dialog/confirm/confirm.component';
import { FooterComponent } from './layout/footer/footer.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { AccountComponent } from './pages/account/account.component';
import { AccountInsertComponent } from './dialog/account-insert/account-insert.component';
import { InvoiceInsertComponent } from './dialog/invoice-insert/invoice-insert.component';
import { ChangePasswordComponent } from './dialog/change-password/change-password.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ContactInsertComponent } from './dialog/contact-insert/contact-insert.component';
import { LedgerComponent } from './pages/ledger/ledger.component';
import { LedgerInsertComponent } from './dialog/ledger-insert/ledger-insert.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { TransactionsInsertComponent } from './dialog/transactions-insert/transactions-insert.component';
import { CreditPlanRecipientComponent } from './pages/credit-plan-recipient/credit-plan-recipient.component';
import { CreditPlanReceiptInsertComponent } from './dialog/credit-plan-receipt-insert/credit-plan-receipt-insert.component';
import { MainAccountCategoryComponent } from './pages/main-account-category/main-account-category.component';
import { MainAccountCategoryInsertComponent } from './dialog/main-account-category-insert/main-account-category-insert.component';
import { PaymentMethodComponent } from './pages/payment-method/payment-method.component';
import { PaymentScheduleComponent } from './pages/payment-schedule/payment-schedule.component';
import { InvoiceProductComponent } from './pages/invoice-product/invoice-product.component';
import { PaymentScheduleInsertComponent } from './dialog/payment-schedule-insert/payment-schedule-insert.component';
import { PaymentMethodInsertComponent } from './dialog/payment-method-insert/payment-method-insert.component';
import { DesignatedCreditInsertComponent } from './dialog/designated-credit-insert/designated-credit-insert.component';
import { DesignatedCreditComponent } from './pages/designated-credit/designated-credit.component';
import { DeliveryFrameworkContactComponent } from './pages/delivery-framework-contact/delivery-framework-contact.component';
import { DisbursementComponent } from './pages/disbursement/disbursement.component';
import { TransactionCategoryComponent } from './pages/transaction-category/transaction-category.component';
import { DisbursementInsertComponent } from './dialog/disbursement-insert/disbursement-insert.component';
import { TransactionCategoryInsertComponent } from './dialog/transaction-category-insert/transaction-category-insert.component';
import { CreditplanComponent } from './pages/creditplan/creditplan.component';
import { CreditplanInsertComponent } from './dialog/creditplan-insert/creditplan-insert.component';
import { PaymentProcessorComponent } from './pages/payment-processor/payment-processor.component';
import { PaymentProcessorInsertComponent } from './dialog/payment-processor-insert/payment-processor-insert.component';
import { DesignationComponent } from './pages/designation/designation.component';
import { DesignationInsertComponent } from './dialog/designation-insert/designation-insert.component';
import { EntitlementComponent } from './pages/entitlement/entitlement.component';
import { EntitlementInsertComponent } from './dialog/entitlement-insert/entitlement-insert.component';
import { InvoiceProductInsertComponent } from './dialog/invoice-product-insert/invoice-product-insert.component';
import { DeliveryframeworkComponent } from './pages/deliveryframework/deliveryframework.component';
import { DeliveryframeworkInsertComponent } from './dialog/deliveryframework-insert/deliveryframework-insert.component';
import { DeliveryFrameworkContactInsertComponent } from './dialog/delivery-framework-contact-insert/delivery-framework-contact-insert.component';
import { DeliveryFrameworkDescriptionComponent } from './pages/delivery-framework-description/delivery-framework-description.component';
import { DeliveryFrameworkDescriptionInsertComponent } from './dialog/delivery-framework-description-insert/delivery-framework-description-insert.component';
registerLocaleData(localeVi);

const LAYOUT_COMPONENTS = [HeaderComponent, ToolbarComponent, PersonnelComponent,
  DefaultComponent, ModuleComponent, RolesComponent, FooterComponent, AccountComponent, InvoiceComponent, CreditPlanRecipientComponent,
  MainAccountCategoryComponent, LedgerComponent, TransactionsComponent, ContactComponent, PaymentMethodComponent, PaymentScheduleComponent,
  InvoiceProductComponent, DeliveryFrameworkContactComponent, DisbursementComponent, TransactionCategoryComponent, DesignatedCreditComponent,
  CreditplanComponent, PaymentProcessorComponent, DesignationComponent, EntitlementComponent, DeliveryframeworkComponent,
  DeliveryFrameworkDescriptionComponent
];
const ENTRY_COMPONENTS = [AdminInsertComponent, AdminModuleInsertComponent,
  AdminRoleInsertComponent, AdminRolePermissionComponent, ConfirmComponent,
  AccountInsertComponent, CreditPlanReceiptInsertComponent, MainAccountCategoryInsertComponent, ContactInsertComponent,
  LedgerInsertComponent, InvoiceInsertComponent, TransactionsInsertComponent, ChangePasswordComponent, DisbursementInsertComponent,
  TransactionCategoryInsertComponent, PaymentScheduleInsertComponent, PaymentMethodInsertComponent, DesignatedCreditInsertComponent,
  CreditplanInsertComponent, PaymentProcessorInsertComponent, DesignationInsertComponent, EntitlementInsertComponent,
  InvoiceProductInsertComponent, DeliveryframeworkInsertComponent, DeliveryFrameworkContactInsertComponent,DeliveryFrameworkDescriptionInsertComponent 
];

@NgModule({
  declarations: [LAYOUT_COMPONENTS, ENTRY_COMPONENTS,  ],
  imports: [
    CommonModule, MaterialModule, RouterModule, ReactiveFormsModule, FormsModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  providers: [
  ],
  entryComponents: [ENTRY_COMPONENTS],
  exports: [LAYOUT_COMPONENTS]
})
export class VerifiedModule { }
