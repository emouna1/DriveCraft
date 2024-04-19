import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth-service.service';
import { CoondidateService } from 'src/app/coondidate.service';

@Component({
  selector: 'app-instructor-profile',
  templateUrl: './instructor-profile.component.html',
  styleUrl: './instructor-profile.component.css'
})
export class InstructorProfileComponent {

  currentUser!: User;
  editUserForm!: FormGroup;
  editMode: boolean = false;
  showEditForm: boolean=false;
  constructor(
    private candidateService:CoondidateService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.initializeForm();
  }

  initializeForm(): void {
    this.editUserForm = this.formBuilder.group({
      username: [this.currentUser.username, Validators.required],
      password: ['', Validators.required],
      email: [this.currentUser.email, [Validators.required, Validators.email]],
      role: [this.currentUser.role, Validators.required],
      name: [this.currentUser.name, Validators.required],
      firstName: [this.currentUser.firstName, Validators.required],
      CIN: [this.currentUser.CIN, Validators.required],
      dateOfIssue: [this.currentUser.dateOfIssue, Validators.required],
      situation: [this.currentUser.situation, Validators.required],
      balance: [this.currentUser.balance, Validators.required],
      dateOfBirth: [this.currentUser.dateOfBirth, Validators.required],
      nationality: [this.currentUser.nationality, Validators.required],
      address: [this.currentUser.address, Validators.required],
      telephone: [this.currentUser.telephone, Validators.required],
      image: [this.currentUser.image],
      
    });
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    if (!this.editMode) {
      this.initializeForm();
    }
    this.showEditForm = true;

  }

  saveChanges(): void {
    if (this.editUserForm.valid) {
      const editedUser: User = this.editUserForm.value;
      this.candidateService.updateUser(this.currentUser.email, editedUser)
        .subscribe(
          () => {
            this.currentUser = editedUser;
            this.toggleEditMode();
            alert("Changes saved successfully");
          },
          error => {
            console.error('Error updating user:', error);
            alert("An error occurred while saving changes");
          }
        );
    }
  }

  deleteUser(): void {
    if (confirm("Are you sure you want to delete your account?")) {
      this.authService.deleteUser(this.currentUser.email)
        .subscribe(
          () => {
            alert("Account deleted successfully");
          },
          error => {
            console.error('Error deleting user:', error);
            alert("An error occurred while deleting the account");
          }
        );
    }
  }
  onImageSelected(event: any): void {
    const file: File = event.target.files[0];
    // You can perform further operations with the selected file, like uploading it to the server
    // For now, let's assume we set the image preview directly
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.editUserForm.patchValue({
        image: e.target.result
      });
    };
    reader.readAsDataURL(file);
  }
  cancelForm() {
    this.showEditForm = false; 
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
  situation: string;
  balance: number;
  dateOfBirth: Date;
  nationality: string;
  address: string;
  telephone: string;
  image?: string|null,
  personalCode?:String|null,
  personnelFunction?:String|null,
  recruitmentDate?:Date|null,
  netSalary?:number|null,
  grossSalary?:number|null,
  qualification?:string|null,
  leaveDaysPerYear?:number|null,
  cnssNumber?:string|null,
  CategoryCode:string |null
  [key: string]: any; // Index signature allowing indexing with a string key
}