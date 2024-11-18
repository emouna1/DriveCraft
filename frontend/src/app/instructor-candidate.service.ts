
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root',
})
export class InstructorCandidateService {
  
  private apiUrl = environment.instructorCandidateCarAPi; // Replace with your actual API URL

  assignCandidate(data: { instructorId: number; studentId: number; carId: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}/assign-candidate`, data);
  }
  constructor(private http: HttpClient) {}

  getCandidates(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/candidates`);
  }
  loadAssignments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/list`);
  }

  getInstructors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/instructors`);
  }

  getVehicles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/vehicles`);
  }
}
