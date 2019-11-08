import { Component, OnInit } from '@angular/core';
import {DesignatedCredit} from '../../../class/designated-credit';
import { ResponseApi } from 'src/app/class/response-api';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { DesignatedCreditService } from 'src/app/service/designated-credit.service';
import { DesignatedCreditInsertComponent } from '../../dialog/designated-credit-insert/designated-credit-insert.component';
import { from } from 'rxjs';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-designated-credit',
  templateUrl: './designated-credit.component.html',
  styleUrls: ['./designated-credit.component.scss']
})
export class DesignatedCreditComponent implements OnInit {
  displayedColumns: string[]=['designatedCreditId','createdBy','modifiedBy','importSequenceNumber','versionNumber', 'name','creditTypedisplay','transactionId', 'Action']
  dataSource = new MatTableDataSource<DesignatedCredit>();
  constructor(private DesignatedCreditService: DesignatedCreditService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.paging();
  }
  paging(){
    this.DesignatedCreditService.paging().subscribe((res: ResponseApi ) => {
      this.dataSource.data = res.data;
    });
  }
  insert() {
    this.dialog.open(DesignatedCreditInsertComponent, {
      width: '450px',
      data: { parent: this }
    });
  }
  edit(designatedCredit: any) {
    this.dialog.open(DesignatedCreditInsertComponent, {
      width: '450px',
      data: { parent: this, DesignatedCredit: designatedCredit }
    });
  }
  delete(id: number) {
    if (confirm('Bạn chọn xóa không ?')) {
      this.DesignatedCreditService.delete(id).subscribe((res: ResponseApi) => {
        this.paging();
      });
    }
  }

  exportAsExcel() {
    let index = 1;
    const excelData = [];
    for (const desingnated of this.dataSource.data) {
      const excelProduct = {};
      excelProduct['ID'] = desingnated.designatedCreditId;
      excelProduct['Được tạo bởi'] =desingnated.createdBy;
      excelProduct['Sửa đổi bởi'] = desingnated.modifiedBy;
      excelProduct['Nhập số thứ tự'] = desingnated.importSequenceNumber;
      excelProduct['Số phiên bản'] = desingnated.versionNumber;
      excelProduct['name'] = desingnated.name;
      excelProduct['creditTypedisplay'] = desingnated.creditTypedisplay;
      excelData.push(excelProduct);
      index++;
    }
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelData);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = { Sheets: { data: worksheet }, SheetNames: ['data'], Custprops: { size: 160 } };
    XLSX.utils.book_append_sheet(wb, worksheet, 'Chỉ định');
    /* save to file */
    XLSX.writeFile(wb, 'hihi.xlsx');
  }
  importTemplate() {
    this.DesignatedCreditService.templateImporting().subscribe(
      res => {
        const url = window.URL.createObjectURL(new Blob([res]));
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = url;
        a.download = 'hihi.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove(); // remove the element
       // window.open(window.URL.createObjectURL(stop));
      });
  }
}
