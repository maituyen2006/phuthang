// Nguyễn Thanh Tùng
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Disbursement } from '../class/disbursement';

@Injectable({
  providedIn: 'root'
})
export class DisbursementService {
  baseUrl = `${localStorage.getItem('ServerUrl')}/Disbursement/ListDisbursement`;
  constructor(private http: HttpClient) { }

  public paging() {
    return this.http.get(`${this.baseUrl}`);
  }
public delete(disbursementId: string) {
    return this.http.delete(`${this.baseUrl}/Delete/${disbursementId}`);
  }
  public insert(admin: Disbursement) {
    return this.http.post(`${this.baseUrl}/Insert`, admin);
  }
  public edit(role: Disbursement) {
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
