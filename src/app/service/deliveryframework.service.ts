import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeliveryframeworkService {
  baseUrl = `${localStorage.getItem('ServerUrl')}/DeliveryFramework/ListDeliveryFramework`;
  constructor(private http:HttpClient) { }
  
  public paging() {
    return this.http.get(`${this.baseUrl}`);
  }
  public delete(id :number){
    return this.http.delete(`${this.baseUrl}/Delete/${id}`);
  }
  public insert(role){
    return this.http.post(`${this.baseUrl}/Insert`,role);
  }
  public edit(role){
    return this.http.put(`${this.baseUrl}/Edit`,role);
  }
}
