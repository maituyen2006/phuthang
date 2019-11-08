import { Injectable } from '@angular/core';
import{HttpClient, HttpParams} from '@angular/common/http'
import{Account} from '../class/account'

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = `${localStorage.getItem('ServerUrl')}/Account/ListAccount`;
  constructor(private http: HttpClient) { }

  public paging() {
    return this.http.get(`${this.baseUrl}`);
  }
  public insert(role) {
    return this.http.post(`${this.baseUrl}/Insert`, role);
  }
  public edit(id:Number){
    return this.http.put(`${this.baseUrl}/Edit`, id);
  }
  public delete(id: Number){
    return this.http.delete(`${this.baseUrl}/Delete/${id}`);
  }
  public findAllAvaiable() {
    return this.http.get(`${this.baseUrl}/FindAllAvaiable`);
  }
}
