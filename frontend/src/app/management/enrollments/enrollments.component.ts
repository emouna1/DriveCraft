import { Component } from '@angular/core';
import { EnrollmentService } from 'src/app/enrollment.service';
@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrl: './enrollments.component.css'
})
export class EnrollmentsComponent {
  enrollments: Enrollment[] = [];
  displayedColumns: string[] = ['candidatCIN', 'candidatName', 'registrationType', 'desiredLicenseCategory', 'examDate', 'actions'];
  showEditForm: boolean = false;
   selectedEnrollment: Enrollment = {
    id:'',
    candidatCIN: '',
    candidatName: '',
    candidatBalance: 0,
    registrationType: 'code',
    contratType: 'fixed',
    PricePerHour: 0,
    paymentId: null,
    specialPrice: null,
    specialPriceAmount: null,
    registrationCosts: 0,
    registrationFees: 0,
    examDate: null,
    desiredLicenseCategory: '',
    detailsVisible: false
  };
  
  constructor(private enrollmentService: EnrollmentService) {}

  
  ngOnInit() {
    this.enrollmentService.getAllEnrollments()
      .subscribe(enrollments => {
        this.enrollments = enrollments;
        console.log(enrollments)
        // Initialize detailsVisible property for each enrollment
        this.enrollments.forEach(enrollment => enrollment.detailsVisible = false);
      });
  }
  toggleDetails(enrollment: Enrollment) {
    enrollment.detailsVisible = !enrollment.detailsVisible; // Toggle the detailsVisible property
  }
  getRegistrationTypeName(type: string): string {
    switch (type) {
      case 'code':
        return 'Code';
      case 'conduct':
        return 'Conduct';
      default:
        return type;
    }
  }

  deleteEnrollment(enrollment: Enrollment) {
    // Implement delete functionality
    this.enrollmentService.deleteEnrollment(enrollment.id)
      .subscribe(() => {
        // Remove the deleted enrollment from the list
        this.enrollments = this.enrollments.filter(e => e !== enrollment);
        console.log('Deleted enrollment:', enrollment);
      });
    }
    editEnrollment(enrollment: Enrollment) {
      this.selectedEnrollment = { ...enrollment }; // Make a copy to avoid directly modifying the original object
      this.showEditForm = true;
    }
  
    submitEdit() {
      this.enrollmentService.editEnrollment(this.selectedEnrollment)
        .subscribe({
          next: (updatedEnrollment: Enrollment) => { // Specify the type of updatedEnrollment
            // Update the enrollment in the list with the updated data
            const index = this.enrollments.findIndex(e => e.id === updatedEnrollment.id);
            if (index !== -1) {
              this.enrollments[index] = updatedEnrollment;
            }
            this.showEditForm = false;
          },
          error: (error) => {
            // Handle error if necessary
            console.error(error);
          }
        });
    }
    closeEditForm() {
      this.showEditForm = false;
    }
    resetForm() {
      // Reset selectedRow object or any other form reset logic
      window.location.reload();
    }
    
    submitEnrollment() {
      if (this.selectedEnrollment) {
        this.enrollmentService.addEnrollment(this.selectedEnrollment).subscribe(response => {
          console.log('New Enrollment added successfully', response);
          this.resetForm();
        }, error => {
          console.error('Error adding Enrollment', error);
        });
      }
    }


    showAddFormFlag: boolean = false;
    newEnrollment: Enrollment = {
      id:'',
      candidatCIN: '',
      candidatName: '',
      candidatBalance: 0,
      registrationType: 'code',
      contratType: 'fixed',
      PricePerHour: 0,
      paymentId: null,
      specialPrice: null,
      specialPriceAmount: null,
      registrationCosts: 0,
      registrationFees: 0,
      examDate: null,
      desiredLicenseCategory: '',
      detailsVisible: false
    };
  
   

   

    
  
  
  
    showAddForm() {
      this.showAddFormFlag = true;
    }
  
    closeAddForm() {
      this.showAddFormFlag = false;
    }
  
    submitAdd() {
      this.enrollmentService.addEnrollment(this.newEnrollment)
        .subscribe({
          next: (addedEnrollment: Enrollment) => {
            this.enrollments.push(addedEnrollment);
            this.closeAddForm();
          },
          error: (error) => {
            console.error(error);
          }
        });
    }
    }
  export interface Enrollment {
    id: string;
    candidatCIN: string;
    candidatName: string;
    candidatBalance: number;
    registrationType: 'code' | 'conduct';
    contratType: 'fixed' | 'variable';
    PricePerHour: number;
    paymentId?: number | null;
    specialPrice?: 'yes' | 'no' | null;
    specialPriceAmount?: number | null;
    registrationCosts: number;
    registrationFees: number;
    examDate?: Date | null;
    desiredLicenseCategory: string;
    detailsVisible?: boolean; // Add detailsVisible property

  }

