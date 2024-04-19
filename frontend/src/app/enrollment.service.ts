import { CodeLessonExam } from './management/schedule/schedule.component';
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

  getRegistrationFees(registrationType: string, categoryCode: string): Observable<number> {
    // Make an HTTP GET request to your backend endpoint with both registration type and category code
    return this.http.get<number>(`http://localhost:3000/folders/registration-fees/${registrationType}/${categoryCode}`);
  }
  
  getAllEnrollments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAllEnrollments`);
  }
  getCodeEnrollments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getCodeEnrollments`);
  }
  getConductEnrollments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getConductEnrollments`);
  }

  addEnrollment(data:Enrollment): Observable<Enrollment> {
    console.log(data)
    return this.http.post<Enrollment>(`${this.apiUrl}/addEnrollment`,data);

  }

  editEnrollment(data:Enrollment): Observable<Enrollment> {
    return this.http.put<Enrollment>(`${this.apiUrl}/updateEnrollment/${data.id}`, data);
  }

  deleteEnrollment(EnrollmentId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteEnrollment/${EnrollmentId}`);
    
  }
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/code-lesson-exams`);
  }

  add(data:CodeLessonExam): Observable<CodeLessonExam> {
    console.log(data)
    return this.http.post<CodeLessonExam>(`${this.apiUrl}/code-lesson-exams`,data);

  }

  edit(data:CodeLessonExam): Observable<CodeLessonExam> {
    return this.http.put<CodeLessonExam>(`${this.apiUrl}/code-lesson-exams/:id/${data.id}`, data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/code-lesson-exams/:id/${id}`);
    
  }
}