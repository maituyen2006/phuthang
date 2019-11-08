import { Injectable } from '@angular/core';
import{ HttpClient, HttpParams } from '@angular/common/http';
import { Transactions } from 'src/app/class/transactions';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  baseUrl = `${localStorage.getItem('ServerUrl')}/Transactions/ListTransactions`;
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
