// Nguyễn Thanh Tùng
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TransactionCategory } from '../class/transaction-category';

@Injectable({
  providedIn: 'root'
})
export class TransactionCategoryService {
  baseUrl = `${localStorage.getItem('ServerUrl')}/TransactionCategory/ListTransactionCategory`;
  constructor(private http: HttpClient) { }

  public paging() {
    return this.http.get(`${this.baseUrl}`);
  }
public delete(transactionCategoryId: string) {
    return this.http.delete(`${this.baseUrl}/Delete/${transactionCategoryId}`);
  }
  public insert(admin: TransactionCategory) {
    return this.http.post(`${this.baseUrl}/Insert`, admin);
  }
  public edit(role: TransactionCategory) {
    return this.http.put(`${this.baseUrl}/Edit`, role);
  }
  public findAllAvaiable() {
    return this.http.get(`${this.baseUrl}/FindAllAvaiable`);
  }
  public templateImporting() {
    return this.http.get(`${this.baseUrl}/ImportTemplate`, { responseType: 'blob' });
  }
  public importAdmins(data: any) {
    return this.http.post(`${this.baseUrl}/Import`, data);
  }
  public findAllInDepartment(id) {
    return this.http.get(`${this.baseUrl}/FindAllInDepartment/${id}`);
  }
  public findAllInSalaryTableProduct(id) {
    return this.http.get(`${this.baseUrl}/FindAllInSalaryTableProduct/${id}`);
  }
  public changePassword(params: any) {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        httpParams = httpParams.append(key, params[key]);
      });
    }
    return this.http.post(`${this.baseUrl}/changePassword`, httpParams);
  }
  public getInformation() {
    return this.http.get(`${this.baseUrl}/Information`);
  }
  public findAdminInRole() {
    return this.http.get(`${this.baseUrl}/FindAdminInRole`);
  }
}
