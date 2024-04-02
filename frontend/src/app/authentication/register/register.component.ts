import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username!: string;
  email!: string;
  password!: string;
  hide= true;
  constructor(private router: Router,private authService: AuthService){}

  onSubmit() {
    const userData = { username: this.username, email: this.email, password: this.password };
    this.authService.signup(userData).subscribe(
      response => {
        // Handle successful signup response (if needed)
        console.log('Signup successful:', response);
        this.router.navigate(['/auth/login']);

      },
      error => {
        // Handle signup error (if needed)
        console.error('Signup error:', error);
      }
    );
  }
}
