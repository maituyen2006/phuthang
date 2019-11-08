import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Company } from '../class/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }
  baseUrl="/Admin/Accountant/ListCompany";

  public paging(params?: any) {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        httpParams = httpParams.append(key, params[key]);
      });
    }
    return this.http.get(`${localStorage.getItem('ServerUrl')}${this.baseUrl}`, { params: httpParams });
  }
  public findAllAvaiable() {
    return this.http.get(`${localStorage.getItem('ServerUrl')}${this.baseUrl}/FindAllAvaiable`);
  }
  public insert(role: Company) {
    return this.http.post(`${localStorage.getItem('ServerUrl')}${this.baseUrl}/Insert`, role);
  }
  public delete(id: number) {
    return this.http.delete(`${localStorage.getItem('ServerUrl')}${this.baseUrl}/Delete/${id}`);
  }
  public block(id: number) {
    return this.http.delete(`${localStorage.getItem('ServerUrl')}${this.baseUrl}/Block/${id}`);
  }
}
