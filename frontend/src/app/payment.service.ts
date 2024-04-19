import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'http://localhost:3000/folders'; // API UR

  constructor(private http: HttpClient) { }

  getAllPayments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAllPaymentS`);
  }
  addPayment(Data: any): Observable<any>  {
    return this.http.post<any[]>(`${this.apiUrl}/addPaymentS`,Data);
  }

  editPayment(id: number,Data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updatePaymentS/${id}`,Data);
  }

  deletePayment(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deletePaymentS/${id}`);
  }
  addEnrollmentPayment(Data: any): Observable<any>  {
    return this.http.post<any[]>(`${this.apiUrl}/paymentSettlement`,Data);
  }

}
