//Vi Văn Tiến

import { Transactions } from './transactions';

export class PaymentMethod {
    createdOn?: Date;
    createdBy?: String;
    modifiedOn?: Date;
    modifiedBy?: String;
    createdOnBehalfBy?: String;
    modifiedOnBehalfBy?: String;
    overriddenCreatedOn?: Date;
    importSequenceNumber?: number;
    ownerIdType?: String;
    ownerId?: String;
    owningBusinessUnit?: string;
    owningUser?: String;
    owningTeam?: String;
    timeZoneRuleVersionNumber?: number;
    uTCConversionTimeZoneCode?: number;
    versionNumber?: number;
    paymentMethodId?: String;
    stateCode?: number;
    stateCodedisplay?: String;
    statusCode?: number;
    statusCodedisplay?: String;
    name?: String;
    comments?: String;
    contactId?: String;
    isDefault: number;
    lastAuthenticationStatus: number;
    lastAuthenticationStatusdisplay: String;
    lastAuthenticationStatusDate: Date;
    lastAuthenticationStatusDetail: String;
    lastAuthenticationStatusTechnicalDetail: String;
    paymentScheduleId: String;
    payorId: String;
    type: number;
    typeDisplay: String;
    transactionId: Transactions;
}
