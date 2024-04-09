import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth-service.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

  currentUser: User ={
    username: '',
    password: '',
    email: '',
    role: '',
    name: '',
    firstName: '',
    CIN: '',
    dateOfIssue: new Date(2000, 0, 1),
    licenseCategory: '',
    situation: '',
    balance: 0,
    dateOfBirth: new Date(2000, 0, 1),
    nationality: '',
    address: '',
    telephone: ''
  }; // Variable to store the current user data
  editedUser: User=
  {
    username: '',
    password: '',
    email: '',
    role: '',
    name: '',
    firstName: '',
    CIN: '',
    dateOfIssue: new Date(2000, 0, 1),
    licenseCategory: '',
    situation: '',
    balance: 0,
    dateOfBirth: new Date(2000, 0, 1),
    nationality: '',
    address: '',
    telephone: ''
  };
  editMode: boolean = false; // Variable to track edit mode

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Retrieve user profile data when the component initializes
    this.currentUser = this.authService.getCurrentUser();
    this.editedUser = { ...this.currentUser }; // Initialize with currentUser data
  }

  
  toggleEditMode() {
    this.editMode = !this.editMode;
    // Reset editedUser to current user data when toggling edit mode
    this.editedUser = { ...this.currentUser };
  }

  saveChanges() {
    this.authService.updateUser(this.currentUser.email, this.editedUser)
      .subscribe(
        () => {
          // Update currentUser with editedUser data
          this.currentUser = { ...this.editedUser };
          this.toggleEditMode(); // Exit edit mode
          alert("Changes saved successfully");
        },
        error => {
          console.error('Error updating user:', error);
          alert("An error occurred while saving changes");
        }
      );
  }
  
  deleteUser() {
    // Prompt user for confirmation
    if (confirm("Are you sure you want to delete your account?")) {
      // Call the delete method in your UserService
      this.authService.deleteUser(this.currentUser.email)
        .subscribe(
          () => {
            // If deletion is successful, you can redirect the user to a confirmation page or perform other actions
            alert("Account deleted successfully");
            // Redirect the user, log out, or perform other actions
          },
          error => {
            // Handle error
            console.error('Error deleting user:', error);
            alert("An error occurred while deleting the account");
          }
        );
    }
  }
 
  /*saveChanges() {
    // Call updateUser method in UserService
    this.authService.updateUser(this.currentUser.id, this.currentUser)
      .subscribe(
        () => {
          // If update is successful, exit edit mode
          this.toggleEditMode();
          // Optionally, you can display a success message or perform other actions
        },
        error => {
          // Handle error
          console.error('Error updating user:', error);
          // Optionally, you can display an error message to the user
        }
      );
  }*/
  getEditedUserKeys(): string[] {
    return Object.keys(this.editedUser);
  }

}
interface User {
  username: string;
  password: string; // Consider using a secure hashing mechanism for password storage
  email: string;
  role: string; // Assuming an enum for user roles (admin, instructor,Employee)
  name: string;
  firstName: string;
  CIN: string; // Assuming CIN is a unique identifier
  dateOfIssue: Date;
  licenseCategory: string;
  situation: string;
  balance: number;
  dateOfBirth: Date;
  nationality: string;
  address: string;
  telephone: string;
  image?: string;
  personalCode?:String,
  personnelFunction?:String,
  recruitmentDate?:Date,
  netSalary?:number,
  grossSalary?:number
  qualification?:string,
  leaveDaysPerYear?:number,
  cnssNumber?:string,
  CategoryCode?:string 
  [key: string]: any; // Index signature allowing indexing with a string key
}