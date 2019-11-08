//Trương Xuân Hiếu
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class
CreditPlanRecipientService {
  baseUrl=`${localStorage.getItem('ServerUrl')}/CreditPlanRecipient/ListCreditPlanRecipient`;

  constructor(private http: HttpClient) { }
  public paging() {
    return this.http.get(`${this.baseUrl}`);
  }
  public insert(role){
    return this.http.post(`${this.baseUrl}/Insert`,role);

  }
  public edit(role){
    return this.http.put(`${this.baseUrl}/Edit`,role);
  }
  public delete(creditRecipientId:number){
    return this.http.delete(`${this.baseUrl}/Delete/${creditRecipientId}`)
  }

}
