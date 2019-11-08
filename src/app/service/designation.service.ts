import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Designation } from '../class/designation';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {
  baseUrl = `${localStorage.getItem('ServerUrl')}/Designation/ListDesignation`;

  constructor(private http: HttpClient) { }
  public login(formData: FormData) {
    return this.http.post(`${localStorage.getItem('ServerUrl')}/Auth`, formData);
  }
  public paging() {
    return this.http.get(`${this.baseUrl}`);
  }

  public delete(id: number) {
    return this.http.delete(`${this.baseUrl}/Delete/${id}`);
  }
  public insert(role: Designation) {
    return this.http.post(`${this.baseUrl}/Insert`, role);
  }
  public edit(role: Designation) {
    return this.http.put(`${this.baseUrl}/Edit`, role);
  }
}
