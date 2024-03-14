import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
onSubmit() {
throw new Error('Method not implemented.');
}
  errorMessage: string = '';
  username: string = '';
  password: string = '';
form: any;
isLoggedIn: any;
userRole: any;

  constructor(private authService: AuthService) {}

  login(): void {
    this.authService.login({ username: this.username, password: this.password })
      .subscribe(
        () => {
          // Handle successful login
          console.log('Login successful');
        },
        (error) => {
          // Handle login error
          this.errorMessage = error.message; // Assuming your AuthService returns an error object with a 'message' property
        }
      );
  }
 
}
