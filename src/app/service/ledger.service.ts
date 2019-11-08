import { Injectable } from '@angular/core';
import{ HttpClient, HttpParams } from '@angular/common/http';
import { Ledger } from 'src/app/class/ledger';

@Injectable({
  providedIn: 'root'
})
export class LedgerService {
  baseUrl = `${localStorage.getItem('ServerUrl')}/Ledger/ListLedger`;
  constructor(private http: HttpClient) { }
  public paging() {
    return this.http.get(`${this.baseUrl}`);
  }
  public insert(role) {
    return this.http.post(`${this.baseUrl}/Insert`, role);
  }
  public edit(role){
    return this.http.put(`${this.baseUrl}/Edit`, role);
  }
  public delete(id: Number){
    return this.http.delete(`${this.baseUrl}/Delete/${id}`);
  }
}
