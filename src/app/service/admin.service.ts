import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Admin } from '../class/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = `${localStorage.getItem('ServerUrl')}/Admin/ListAdmin`;
  constructor(private http: HttpClient) { }
  public login(formData: FormData) {
    return this.http.post(`${localStorage.getItem('ServerUrl')}/Auth`, formData);
  }
  public paging() {
    return this.http.get(`${this.baseUrl}`);
  }
  public block(id: number) {
    return this.http.delete(`${this.baseUrl}/Block/${id}`);
  }
  public delete(id: number) {
    return this.http.delete(`${this.baseUrl}/Delete/${id}`);
  }
  public insert(admin: Admin) {
    return this.http.post(`${this.baseUrl}/Insert`, admin);
  }
  public edit(admin: Admin) {
    return this.http.post(`${this.baseUrl}/Edit`, admin);
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
