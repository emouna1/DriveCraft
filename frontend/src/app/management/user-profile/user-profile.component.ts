import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth-service.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  currentUser: any; // Variable to store the current user data

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Retrieve user profile data when the component initializes
    this.currentUser = this.authService.getCurrentUser();
  }
}
