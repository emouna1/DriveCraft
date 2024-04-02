import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  authservice: any;
  hidePassword: boolean = true;
  constructor(private router:Router,private authService:AuthService) {}

  
    async login() {
      const userData = { username: this.username, password: this.password };
      this.authService.login(userData.username,userData.password)
        .then((response: any) => {
          const token = response.token;
          if (token) {
            localStorage.setItem('token', token);
          }})
          try {
          console.log('Logging in...');
          const success = await this.authService.login(this.username, this.password);
          if (success) {
        this.router.navigate(['/manage/dash']);
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'You have been successfully logged in!',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Invalid username or password. Please try again.',
        });
      }
        } catch (error) {
      console.error('Login error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'An error occurred during login. Please try again later.',
      });
    }}
   togglePasswordVisibility(): void { 
    this.hidePassword= !this.hidePassword}

    
  }
