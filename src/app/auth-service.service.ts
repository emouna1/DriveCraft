import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: { username: string, password: string }): Observable<any> {
    // Send HTTP request to backend API for login
    return this.http.post<any>('http://your-api/login', credentials);
  }

  logout(): Observable<any> {
    // Send HTTP request to backend API for logout
    return this.http.post<any>('http://your-api/logout', {});
  }

  getUserInfo(): Observable<any> {
    // Send HTTP request to backend API to fetch user information
    return this.http.get<any>('http://your-api/user-info');
  }

  getUserRole(): Observable<string> {
    // Send HTTP request to backend API to fetch user role
    return this.http.get<string>('http://your-api/user-role');
  }

  hasPermission(permission: string): Observable<boolean> {
    // Send HTTP request to backend API to check if user has the given permission
    return this.http.get<boolean>('http://your-api/has-permission', { params: { permission } });
  }
}
