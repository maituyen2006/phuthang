import { Injectable } from '@angular/core';
import{ HttpClient, HttpParams } from '@angular/common/http';
import { DeliveryFrameworkDescription } from 'src/app/class/delivery-framework-description';

@Injectable({
  providedIn: 'root'
})
export class DeliveryFrameworkDescriptionService {
  baseUrl = `${localStorage.getItem('ServerUrl')}/DeliveryFrameworkDescription/ListDeliveryFrameworkDescription`;
  constructor(private http: HttpClient) { }
  public paging() {
    return this.http.get(`${this.baseUrl}`);
  }
  public insert(role) {
    return this.http.post(`${this.baseUrl}/Insert`, role);
  }
  public edit(id: Number){
    return this.http.put(`${this.baseUrl}/Edit`, id);
  }
  public delete(id: Number){
    return this.http.delete(`${this.baseUrl}/Delete/${id}`);
  }
}
