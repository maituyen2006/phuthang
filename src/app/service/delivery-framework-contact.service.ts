//Trương Xuân Hiếu
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeliveryFrameworkContactService {
  baseUrl=`${localStorage.getItem('ServerUrl')}/DeliveryFrameworkContact/ListDeliveryFrameworkContact`;

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
  public delete(deliveryFrameworkContactId:number){
    return this.http.delete(`${this.baseUrl}/Delete/${deliveryFrameworkContactId}`)
  }
}
