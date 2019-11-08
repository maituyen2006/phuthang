import { Injectable } from '@angular/core';
import{HttpClient, HttpParams} from '@angular/common/http'
import { Contact } from 'src/app/class/contact'

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  baseUrl = `${localStorage.getItem('ServerUrl')}/Contact`;
  constructor(private http: HttpClient) { }

  public paging() {
    return this.http.get(`${this.baseUrl}`);
  }
  public insert(admin: Account) {
    return this.http.post(`${this.baseUrl}/Insert`, admin);
  }
  public edit(admin: Account){
    return this.http.post(`${this.baseUrl}/Edit`, admin);
  }
  public delete(id: number){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  public findAllAvaiable() {
    return this.http.get(`${this.baseUrl}/FindAllAvaiable`);
  }
}
