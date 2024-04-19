import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  
  constructor(private http: HttpClient) {}
  private baseUrl = 'http://localhost:3000/auth'; // Replace with the base URL of your API

  private currentUser: any | null = null; // Initialize as null
  private isAuthenticatedFlag: boolean = false;
  redirectUrl: string | null = null; // Property to store the intended URL for redirection
  
  signup(userData: { username: string, email: string, password:string}):Observable<any> {
    return this.http.post<any>('http://localhost:3000/auth/signup', userData);
  }
  
  async login(username: string, password: string): Promise<boolean> {
    const url = `${this.baseUrl}/login`; // Replace with your login API endpoint
    console.log("this username ",username);
    console.log("this password ",password);

    const credentials = {
      username: username,
      password: password,
    };
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    try {
      console.log('Sending login request to server...');
      const response = await this.http.post<any>(url, credentials, { headers }).toPromise();
  
      console.log('Response from server:', response);
  
      if (response && response.token) {
        console.log('Authentication successful');
        // Store the token in local storage or wherever you're managing authentication
        this.setToken(response.token);
        this.setUsername(username); // Store username in local storage
        this.setCurrentUser(response.user);
        return true;
      } else {
        console.log('Authentication failed');
        return false;
      }
      
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  logout(): Observable<any> {
    localStorage.removeItem('token');
    localStorage.removeItem('username'); // Remove username from local storage on logout
    localStorage.removeItem('currentUser');
    return this.http.post<any>(`${this.baseUrl}/logout`, {});
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  setUsername(username: string): void {
    localStorage.setItem('username', username);
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }
  getCurrentUserRole(): string | null {
    const currentUser = this.getCurrentUser();
    console.log(currentUser.role)
    return currentUser ? currentUser.role : null;
  }

  getCurrentUserCIN(): string | null {
    const currentUser = this.getCurrentUser();
    console.log(currentUser.CIN)
    return currentUser ? currentUser.CIN : null;
  }

  deleteUser(email: string): Observable<any> {
    const url = `${this.baseUrl}/users/${email}`; // Assuming your API endpoint follows RESTful conventions
    return this.http.post<any>(url, {email});

   
  }
  
requestPasswordReset(email: string): Observable<any> {
  const url = `${this.baseUrl}/forgotpassword`; // Backend endpoint URL
  return this.http.post<any>(url, { email });
}

resetPassword(email: string, token: string, newPassword: string): Observable<any> {
  const url = `${this.baseUrl}/resetpassword`; // Backend endpoint URL for resetting password
  return this.http.post<any>(url, { email, token, newPassword });
}

setCurrentUser(user: any): void {
  localStorage.setItem('currentUser', JSON.stringify(user));
}

getCurrentUser(): any | null {
  const userString = localStorage.getItem('currentUser');
  return userString ? JSON.parse(userString) : null;
}


changePassword(email: string, oldPassword: string, newPassword: string): Observable<any> {
  const url = `${this.baseUrl}/changePassword`; // Backend endpoint URL for resetting password
  return this.http.post<any>(url, { email , oldPassword, newPassword });
}

}
