import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Entitlement} from '../class/entitlement';
@Injectable({
  providedIn: 'root'
})
export class EntitlementService {
  baseUrl = `${localStorage.getItem('ServerUrl')}/Entitlement/ListEntitlement`;

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
  public delete(id: number){
    return this.http.delete(`${this.baseUrl}/Delete/${id}`)
  }

}
