
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

interface Candidate {
  id: number;
  name: string;
}

interface Instructor {
  id: number;
  name: string;
  candidates: Candidate[];
}

interface Vehicle {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class InstructorCandidateService {
  
  private apiUrl = environment.instructorCandidateCarAPi; // Replace with your actual API URL

  assignCandidate(data: { instructorId: number; studentId: number; carId: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}/assignCandidate`, data);
  }
  constructor(private http: HttpClient) {}

  getCandidates(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(`${this.apiUrl}/candidates`);
  }

  getInstructors(): Observable<Instructor[]> {
    return this.http.get<Instructor[]>(`${this.apiUrl}/instructors`);
  }

  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.apiUrl}/vehicles`);
  }
}
