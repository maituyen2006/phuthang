import { Deliveryframework } from "./deliveryframework";

export class DeliveryFrameworkDescription {
  deliveryFrameworkDescriptionId: String;
  createdOn?: Date;
  createdBy?: String;
  modifiedOn?: Date;
  modifiedBy?: String;
  createdOnBehalfBy?: String;
  modifiedOnBehalfBy?: String;
  overriddenCreatedOn?: Date;
  importSequenceNumber?: Number;
  ownerIdType?: String;
  ownerId?: String;
  owningBusinessUnit?: String;
  owningUser?: String;
  owningTeam?: String;
  timeZoneRuleVersionNumber?: Number;
  utcconversionTimeZoneCode?: Number;
  versionNumber?: Number;
  stateCode?: Number;
  stateCodedisplay: String;
  statusCode?: Number;
  statusCodedisplay?: String;
  name?: String;
  deliveryFrameworkId?: Deliveryframework;
  description?: String;
  typeId?: String;
}
