export class Pager {
    currentPage = 1;
    displayPerPage = 10;
    totalResult = 0;
    orderColumn = '';
    keyword = '';
    asc = true;
}
export class PagerHistoryWarehouseProduct extends Pager {
    salaryCycleID: number = null;
    wareHouseID: number = null;
    // historyTypeID: number = null;
}
