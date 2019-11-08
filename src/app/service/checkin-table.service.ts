import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CheckinTableService {
  private baseUrl = `${localStorage.getItem('ServerUrl')}/Admin/CheckInTable`;
  constructor(private http: HttpClient) { }

  public allDateCheck(salaryCycleID?: number) {
    return this.http.get(`${this.baseUrl}/DateCheckStatus?salaryCycleID=${salaryCycleID}`);
  }
  public findAllCheckInByDate(dateCheck?: any) {
    return this.http.get(`${this.baseUrl}/FindAllCheckInByDate?dateCheck=${dateCheck}`);
  }
  public importDateCheck(data: any) {
    return this.http.post(`${this.baseUrl}/Import`, data);
  }
  public findAllNotCheckIn(dateCheck: any) {
    return this.http.get(`${this.baseUrl}/FindAllNotCheckIn?dateCheck=${dateCheck}`);
  }
  public insert(params?: any) {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (typeof params[key] !== 'undefined' && params[key] != null) {
          httpParams = httpParams.append(key, params[key]);
        }
      });
    }
    return this.http.post(`${this.baseUrl}/Insert`, httpParams);
  }
  public edit(params?: any) {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (typeof params[key] !== 'undefined' && params[key] != null) {
          httpParams = httpParams.append(key, params[key]);
        }
      });
    }
    return this.http.post(`${this.baseUrl}/Edit`, httpParams);
  }
  public delete(id: number) {
    return this.http.delete(`${this.baseUrl}/Delete/${id}`);
  }
}
