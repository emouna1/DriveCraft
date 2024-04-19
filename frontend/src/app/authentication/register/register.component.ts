import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  
  username: string = '';
  email: string = '';
  password: string = '';
  hide: boolean = true;
  selectedRole: string | null = null;
  firstName: string = '';
  name: string = '';
  CIN: string = '';
  dateOfIssue: Date | null = null;
  situation: string = '';
  dateOfBirth: Date | null = null;
  nationality: string = '';
  address: string = '';
  telephone: string = '';
  image: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {
    if (!this.selectedRole) {
      console.error('Role not selected.');
      return;
    }

    const userData = {
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.selectedRole,
      firstName: this.firstName,
      name: this.name,
      CIN: this.CIN,
      //dateOfIssue: this.dateOfIssue,
      situation: this.situation,
      dateOfBirth: this.dateOfBirth,
      nationality: this.nationality,
      address: this.address,
      telephone: this.telephone,
      image: this.image
    };

    this.authService.signup(userData).subscribe(
      response => {
        console.log('Signup successful:', response);
        Swal.fire({
          icon: 'success',
          title: 'Signup Successful',
          text: 'You have successfully signed up!',}).then(()=>

        {this.router.navigate(['/enroll']);})
      },
      error => {
        console.error('Signup error:', error);
        // Handle signup error
        Swal.fire({
          icon: 'error',
          title: 'Signup Failed',
          text: 'There was an error during signup. Please try again later.',
        });
      }
    );
  }

}
