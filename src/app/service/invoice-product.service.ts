import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class InvoiceProductService {
  baseUrl = `${localStorage.getItem('ServerUrl')}/InvoiceProduct/ListInvoiceProduct`;
  constructor(private http: HttpClient) { }
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
  public search(keyword:string){
    return this.http.get(`${this.baseUrl}/Search/${keyword}`);
  }
}

