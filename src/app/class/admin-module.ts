export class AdminModule {
    id: Number;
    name: String;
    controller: String;
    icon: String;
    parentId: AdminModule;
    isShow: Boolean;
    isDeleted: Boolean;
    orderNumber: Number;
    level: Number;
    routeLink: String;
    children?: AdminModule[]
}