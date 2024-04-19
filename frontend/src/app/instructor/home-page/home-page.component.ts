import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructor-home-page', // Change selector to a unique value
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  isLoggedIn: boolean = false;
  userName: string = '';

  constructor(private authService: AuthService,private router: Router) { }

  ngOnInit(): void {
    // Check if user is logged in
    this.isLoggedIn = this.authService.isLoggedIn();

    // If user is logged in, get user's name
    // Ensure that the username is only assigned if isLoggedIn returns true
    if (this.authService.isLoggedIn()) {
      const username = this.authService.getUsername(); // Retrieve the username from AuthService
      this.userName = username ? username : ''; // Provide a default value if the username is null
}

  }

  logout(): void {
    // Call logout function in AuthService
    this.authService.logout().subscribe(
      () => {
        // Update isLoggedIn status and clear userName
        this.isLoggedIn = false;
        this.userName = '';

        // Show SweetAlert success notification
        Swal.fire({
          icon: 'success',
          title: 'Logged out successfully',
          showConfirmButton: false,
          timer: 1500 // Close after 1.5 seconds
        }).then(() => {
          // Redirect to the home page
          this.router.navigate(['/']); // Adjust the route if necessary
        });
      },
      error => {
        console.error('Logout error:', error);
      }
    );
  }
}