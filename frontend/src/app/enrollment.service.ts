import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enrollment } from './management/enrollments/enrollments.component';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  private apiUrl = 'http://localhost:3000/home'; // Adjust this to your API URL

  constructor(private http: HttpClient) { }

  
  getAllEnrollments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAllEnrollments`);
  }

  addEnrollment(data:Enrollment): Observable<Enrollment> {
    console.log(data)
    return this.http.post<Enrollment>(`${this.apiUrl}/addEnrollment`,data);

  }

  editEnrollment(data:Enrollment): Observable<Enrollment> {
    return this.http.put<Enrollment>(`${this.apiUrl}/enrollments/${data.id}`, data);
  }

  deleteEnrollment(EnrollmentId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/enrollments/${EnrollmentId}`);
    
  }
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/code-lesson-exams`);
  }

  add(data:Enrollment): Observable<Enrollment> {
    console.log(data)
    return this.http.post<Enrollment>(`${this.apiUrl}/code-lesson-exams`,data);

  }

  edit(data:Enrollment): Observable<Enrollment> {
    return this.http.put<Enrollment>(`${this.apiUrl}/code-lesson-exams/:id/${data.id}`, data);
  }

  delete(EnrollmentId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/code-lesson-exams/:id/${EnrollmentId}`);
    
  }
}