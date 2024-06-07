import { AuthService } from 'src/app/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { CoondidateService } from 'src/app/coondidate.service';

@Component({
  selector: 'app-instructor-page',
  templateUrl: './instructor-page.component.html',
  styleUrl: './instructor-page.component.css'
})
export class InstructorPageComponent implements OnInit {
   /* instructor: any;
    currentUser!: any;

    constructor(
      private instructorService: CoondidateService,
      private authService: AuthService
    ) { }
  
    ngOnInit(): void {
      this.currentUser = this.authService.getCurrentUser();
      console.log(this.currentUser.id)
      this.getInstructorForCandidate(this.currentUser.id);
    }
  
    getInstructorForCandidate(candidateId: string): void {
      this.instructorService.getInstructorForCandidate(candidateId)
        .subscribe(
          (data) => {
            this.instructor = data;
            console.log(this.instructor)
          },
          (error) => {
            console.error('Error fetching instructor for candidate:', error);
            // Handle error
          }
        );
    }
  }*/
  instructor: any;
  currentUser: any;
  vehicle!: Vehicle;
  baseUrl: string = 'http://localhost:3000'; // Change the base URL to match your server configuration

  constructor(
    private instructorService: CoondidateService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.getInstructorForCandidate(this.currentUser.id);
  }

  getInstructorForCandidate(candidateId: string): void {
    this.instructorService.getInstructorForCandidate(candidateId)
      .subscribe(
        (data: any) => {
          console.log(data)
          this.instructor = data.instructor;
          this.vehicle = data.vehicle; // Assuming the vehicle details are returned in the 'car' property
          console.log('Instructor details:', this.instructor);
          console.log('Vehicle details:', this.vehicle);
        },
        (error) => {
          console.error('Error fetching instructor details:', error);
          // Handle error
        }
      );
  }
  getImageUrl(imagePath: string): string {
    // Check if the imagePath contains a backslash, indicating a Windows-style path
    if (imagePath.includes('\\')) {
      // For Windows-style paths, replace backslashes with forward slashes and concatenate with baseUrl
      return `${this.baseUrl}/${imagePath.replace(/\\/g, '/')}`;
    } else {
      // For Unix-style paths or paths with forward slashes, directly concatenate with baseUrl
      return `${this.baseUrl}${imagePath}`;
    }
  }
  
}
export interface Vehicle {
  LicensePlate: string;
  Brand: string;
  Type: string;
  Power: string;
  Fuel: string;
  Odometer: number;
  Color: string;
  PurchasePrice: number;
  Date: string; // Assuming date is represented as a string in ISO 8601 format
  Observation: string;
  Image: string;
}