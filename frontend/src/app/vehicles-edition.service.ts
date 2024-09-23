import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiclesEditionService {
  private apiUrl = environment.carApi; // API UR

  constructor(private http: HttpClient) { }

  getCars(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAllCars`);
  }

  addCar(vehicleData: any): Observable<any> {
    console.log("Adding Car:",vehicleData); 
    return this.http.post<any>(`${this.apiUrl}/addCar`,vehicleData);

  }

  updateCar(LicensePlate: string ,vehicleData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updateCar/${LicensePlate}`,vehicleData);
  }

  deleteCar(LicensePlate: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deleteCar/${LicensePlate}`);
  }
}
