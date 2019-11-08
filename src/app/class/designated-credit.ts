//Vi Văn Tiến
import { Transactions } from './transactions';

export class DesignatedCredit {
    createdOn?: Date;
    createdBy?:string;
    modifiedOn?: Date;
    modifiedBy?:string;
    createdOnBehalfBy?:string;
    modifiedOnBehalfBy?:string;
    overriddenCreatedOn?: Date;
    importSequenceNumber?:number;
    ownerIdType?:string;
    ownerId?:string;
    owningBusinessUnit?:string;
    owningUser?:string;
    owningTeam?:string;
    timeZoneRuleVersionNumber?:number;
    uTCConversionTimeZoneCode?:number;
    versionNumber?:number;
    designatedCreditId?:string;
    stateCode?:number;
    stateCodedisplay?:string;
    statusCode?:number;
    statusCodedisplay?:string;
    name?:string;
    adjustmentComment?:string;
    adjustmentReason?:number;
    adjustmentReasondisplay?:string;
    adjustmentType?:string;
    adjustmentTypedisplay?:string;
    amount?:number;
    transactionCurrencyId?:string;
    exchangeRate?:number;
    amountBase?:number;
    applyToCommitmentPaymentDate?:Date;
    bookDate?:Date;
    creditReason?:number;
    creditReasondisplay?:string;
    creditType?:number;
    creditTypedisplay?:string;
    dataEntryReference?:string;
    dataEntrySource?:number;
    dataEntrySourcedisplay?:string;
    msnfpDesignatiedcreditDesignationId?:string;
    exchangeRateDate?:Date;
    isAdjusted?:boolean;
    postedDate?:Date;
    receivedDate?:Date;
    transactionId?:Transactions;
    
}
