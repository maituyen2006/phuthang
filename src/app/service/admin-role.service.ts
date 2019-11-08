import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AdminRole } from '../class/admin-role';

@Injectable({
  providedIn: 'root'
})
export class AdminRoleService {
  baseUrl = `${localStorage.getItem('ServerUrl')}/Admin/Permission/ListRole`;
  constructor(private http: HttpClient) { }

  public paging(params?: any) {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        httpParams = httpParams.append(key, params[key]);
      });
    }
    return this.http.get(`${this.baseUrl}`, { params: httpParams });
  }
  public block(id: number) {
    return this.http.delete(`${this.baseUrl}/Block/${id}`);
  }
  public delete(id: number) {
    return this.http.delete(`${this.baseUrl}/Delete/${id}`);
  }
  public insert(role: AdminRole) {
    return this.http.post(`${this.baseUrl}/Insert`, role);
  }
  public edit(role: AdminRole) {
    return this.http.post(`${this.baseUrl}/Edit`, role);
  }
  public findAllAvaiable() {
    return this.http.get(`${this.baseUrl}/FindAllAvaiable`);
  }
}
