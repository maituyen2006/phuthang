import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminModule } from '../class/admin-module';

@Injectable({
  providedIn: 'root'
})
export class AdminModuleService {

  constructor(private http: HttpClient) { }

  public getAllAvaiableModule() {
    return this.http.get(`${localStorage.getItem('ServerUrl')}/Admin/Permission/ListModule`);
  }
  public getAllModuleOfUser() {
    return this.http.get(`${localStorage.getItem('ServerUrl')}/Admin/Permission/ListModuleOfUser`);
  }
  public block(id: number) {
    return this.http.delete(`${localStorage.getItem('ServerUrl')}/Admin/Permission/ListModule/Block/${id}`);
  }
  public delete(id: number) {
    return this.http.delete(`${localStorage.getItem('ServerUrl')}/Admin/Permission/ListModule/Delete/${id}`);
  }
  public insert(admin: AdminModule) {
    return this.http.post(`${localStorage.getItem('ServerUrl')}/Admin/Permission/ListModule/Insert`, admin);
  }
  public edit(admin: AdminModule) {
    return this.http.post(`${localStorage.getItem('ServerUrl')}/Admin/Permission/ListModule/Edit`, admin);
  }
}
