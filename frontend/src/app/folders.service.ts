import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PeriodicElement } from './management/maintenance-edition/maintenance-edition.component';

@Injectable({
  providedIn: 'root'
})
export class FoldersService {
  
  
  private apiUrl = 'http://localhost:3000/folders'; // API UR

  constructor(private http: HttpClient) { }

  getCarM(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAllM`);
  }
  addCarM(Data: any): Observable<any>  {
    console.log(Data)
    return this.http.post<any[]>(`${this.apiUrl}/addM`,Data);
  }
  editCarM(code: number ,Data: any): Observable<any> {
    console.log(code)
    return this.http.put<any>(`${this.apiUrl}/updateM/${code}`,Data);
  }

  deleteCarM(code: number): Observable<any> {
    console.log(code)
    return this.http.delete<any>(`${this.apiUrl}/deleteM/${code}`);
  }

  getAllLc(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAllLc`);
  }
  addLc(Data: any): Observable<any>  {
    return this.http.post<any[]>(`${this.apiUrl}/addLc`,Data);
  }

  editLcategory(code: string ,Data: any): Observable<any> {
    console.log(code)
    return this.http.put<any>(`${this.apiUrl}/updateLc/${code}`,Data);
  }

  deleteLcategory(code: string): Observable<any> {
    console.log(code)
    return this.http.delete<any>(`${this.apiUrl}/deleteLc/${code}`);
  }
  getAllPaymentMethods(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAllPaymentMethods`);
  }
  addPaymentM(Data: any): Observable<any>  {
    return this.http.post<any[]>(`${this.apiUrl}/addpayMethod`,Data);
  }

  editPaymentM(method: string ,Data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updatepayMethod/${method}`,Data);
  }

  deletePaymentM(method: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deletepayMethod/${method}`);
  }


}