import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoondidateService {
  
  private apiUrl = environment.coondidateApi; // Adjust this to your API URL

  constructor(private http: HttpClient) { }

  getAllStudents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAllStudents`);
  }

  addStudent(candidate: any): Observable<any[]> {
    console.log(candidate)
    return this.http.post<any>(`${this.apiUrl}/addStudent`,candidate);

  }
  updateUser(cin: string, updatedData: any): Observable<any> {
    const url = `${this.apiUrl}/updateStudent/${cin}`; // Assuming your API endpoint follows RESTful conventions

    // Send PUT request to the API with updated user data
    return this.http.put(url, updatedData)

  }
  editStudent(candidate: any): Observable<any[]> {
    return this.http.put<any>(`${this.apiUrl}/updateStudent/${candidate.CIN}`, candidate);
  }

  deleteStudent(candidateCIN: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteStudent/${candidateCIN}`);
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
    return this.http.put<any>(`${this.apiUrl}/updateEmployee/${candidate.CIN}`, candidate);
  }


  deleteEmployee(candidateId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteEmployee/${candidateId}`);
  }
  getInstructorForCandidate(candidateId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/instructor-for-candidate/${candidateId}`);
  }

  getLessonsForInstructor(instructorId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getLessonsForInstructor/${instructorId}`);
  }
  getExamsForInstructor(instructorId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getExamsForInstructor/${instructorId}`);
  }
  getStudentsForInstructor(instructorId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getStudentsForInstructor/${instructorId}`);
  }
}
