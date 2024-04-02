import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiclesEditionService {
  private apiUrl = 'http://localhost:3000/Car'; // API UR

  constructor(private http: HttpClient) { }

  getCars(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAllCars`);
  }

  addCar(vehicleData: any): Observable<any> {
    console.log("Adding Car:",vehicleData); 
    /*const modifiedVehicle = {
    LicensePlate:vehicleData['licensePlate'], // Change property name
    Brand:vehicleData['brand'], // Change property name
    Type:vehicleData['type'],
    Power:vehicleData['power'],
    Fuel:vehicleData['fuel'],
    Odometer:vehicleData['odometer'],
    Color:vehicleData['color'],
    PurchasePrice:vehicleData['purchasePrice'], // Change property name
    Date:vehicleData['date'],
    Observation:vehicleData['observation']
    // Add more modifications as needed
  };*/
    return this.http.post<any>(`${this.apiUrl}/addCar`,vehicleData);

  }

  updateCar(LicensePlate: string ,vehicleData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updateCar/${LicensePlate}`,vehicleData);
  }

  deleteCar(LicensePlate: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deleteCar/${LicensePlate}`);
  }
}
