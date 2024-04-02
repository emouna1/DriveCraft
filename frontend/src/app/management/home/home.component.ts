import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
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
