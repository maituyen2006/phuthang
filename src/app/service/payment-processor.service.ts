import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaymentProcessor } from '../class/payment-processor';

@Injectable({
  providedIn: 'root'
})
export class PaymentProcessorService {
  baseUrl = `${localStorage.getItem('ServerUrl')}/PaymentProcessor/ListPaymentProcessor`;

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
  public insert(role: PaymentProcessor) {
    return this.http.post(`${this.baseUrl}/Insert`, role);
  }
  public edit(role: PaymentProcessor) {
    return this.http.put(`${this.baseUrl}/Edit`, role);
  }
}
