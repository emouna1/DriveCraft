import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoondidateService {
  private apiUrl = 'http://localhost:3000/User'; // Adjust this to your API URL

  constructor(private http: HttpClient) { }

  getAllStudents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAllStudents`);
  }

  addStudent(candidate: any): Observable<any[]> {
    console.log(candidate)
    return this.http.post<any>(`${this.apiUrl}/addStudent`,candidate);

  }

  editStudent(candidate: any): Observable<any[]> {
    return this.http.put<any>(`${this.apiUrl}/updateStudent/${candidate.id}`, candidate);
  }

  deleteStudent(candidateId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteStudent/${candidateId}`);
  }
  getAllُُُEmployees(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAllEmployees`);
  }
  getAllُُُInstructors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAllInstructors`);
  }
  getAllُُُAdmins(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAllAdmins`);
  }
  addEmployee(candidate: any): Observable<any[]> {
    console.log(candidate)
    return this.http.post<any>(`${this.apiUrl}/addEmployee`, candidate);
  }

  editEmployee(candidate: any): Observable<any[]> {
    return this.http.put<any>(`${this.apiUrl}/updateEmployee/${candidate.id}`, candidate);
  }

  deleteEmployee(candidateId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteEmployee/${candidateId}`);
  }

}
