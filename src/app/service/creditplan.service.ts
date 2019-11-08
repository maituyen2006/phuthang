import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Creditplan } from '../class/creditplan';

@Injectable({
  providedIn: 'root'
})
export class CreditplanService {
  baseUrl = `${localStorage.getItem('ServerUrl')}/CreditPlan/ListCreditPlan`;
  
  constructor(private http: HttpClient) { }
  public login(formData: FormData) {
    return this.http.post(`${localStorage.getItem('ServerUrl')}/Auth`, formData);
  }
  public paging() {
    return this.http.get(`${this.baseUrl}`);
  }

  public delete(id: number) {
    return this.http.delete(`${this.baseUrl}/Delete/${id}`);
  }
  public insert(role: Creditplan) {
    return this.http.post(`${this.baseUrl}/Insert`, role);
  }
  public edit(role: Creditplan) {
    return this.http.put(`${this.baseUrl}/Edit`, role);
  }
  public findAllAvaiable() {
    return this.http.get(`${this.baseUrl}/FindAllAvaiable`);
  }
  
}
