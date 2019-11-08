import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { VerifiedComponent } from './verified/verified.component';
import { AuthGuard } from './auth/guard/auth.guard';
import { VerifiedGuard } from './verified/guard/verified.guard';
import { PersonnelComponent } from './verified/pages/personnel/personnel.component';
import { DefaultComponent } from './verified/pages/default/default.component';
import { ModuleComponent } from './verified/pages/module/module.component';
import { RolesComponent } from './verified/pages/roles/roles.component';
import { CreditPlanRecipientComponent } from './verified/pages/credit-plan-recipient/credit-plan-recipient.component';
import { MainAccountCategoryComponent } from './verified/pages/main-account-category/main-account-category.component';
import { ContactComponent } from './verified/pages/contact/contact.component';
import { LedgerComponent } from './verified/pages/ledger/ledger.component';
import { TransactionsComponent } from './verified/pages/transactions/transactions.component';
import { AccountComponent } from './verified/pages/account/account.component';
import { InvoiceComponent } from './verified/pages/invoice/invoice.component';
import { CreditplanComponent } from './verified/pages/creditplan/creditplan.component';
import { PaymentProcessorComponent } from './verified/pages/payment-processor/payment-processor.component';
import { DesignationComponent } from './verified/pages/designation/designation.component';
import { PaymentScheduleComponent } from './verified/pages/payment-schedule/payment-schedule.component';
import { PaymentMethodComponent } from './verified/pages/payment-method/payment-method.component';
import { InvoiceProductComponent } from './verified/pages/invoice-product/invoice-product.component';
import { DisbursementComponent } from './verified/pages/disbursement/disbursement.component';
import { TransactionCategoryComponent } from './verified/pages/transaction-category/transaction-category.component';
import { EntitlementComponent } from './verified/pages/entitlement/entitlement.component';
import {DeliveryframeworkComponent} from './verified/pages/deliveryframework/deliveryframework.component';
import { DeliveryFrameworkContactComponent } from './verified/pages/delivery-framework-contact/delivery-framework-contact.component';
import { DesignatedCreditComponent } from './verified/pages/designated-credit/designated-credit.component';
import { DeliveryFrameworkDescriptionComponent } from './verified/pages/delivery-framework-description/delivery-framework-description.component';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  {
    path: 'verified', component: VerifiedComponent, canActivate: [VerifiedGuard],
    children: [
      { path: '', redirectTo: 'default', pathMatch: 'full' },
      { path: 'default', component: DefaultComponent },
      { path: 'personnels', component: PersonnelComponent },
      { path: 'modules', component: ModuleComponent },
      { path: 'roles', component: RolesComponent },
      { path: 'account', component: AccountComponent },
      { path: 'invoice', component: InvoiceComponent },
      { path: 'creditplan', component: CreditplanComponent },
      { path: 'payment-processor', component: PaymentProcessorComponent },
      { path: 'designation', component: DesignationComponent },
      { path: 'payment-schedule', component: PaymentScheduleComponent },
      { path: 'payment-method', component: PaymentMethodComponent },
      { path: 'credit-plan-recipient', component: CreditPlanRecipientComponent },
      { path: 'main-account-category', component: MainAccountCategoryComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'ledger', component: LedgerComponent },
      { path: 'transactions', component: TransactionsComponent },
      { path: 'invoice-product', component: InvoiceProductComponent },
      { path: 'disbursement', component: DisbursementComponent },
      { path: 'transactionCategory', component: TransactionCategoryComponent },
      { path: 'entitlement', component: EntitlementComponent },
      { path: 'deliveryframework', component: DeliveryframeworkComponent},
      { path: 'delivery-framework-contact', component: DeliveryFrameworkContactComponent},
      { path: 'designated-credit', component: DesignatedCreditComponent},
      { path: 'deliveryframeworkdescription', component: DeliveryFrameworkDescriptionComponent}
      // {path}
    ]
  }
];
