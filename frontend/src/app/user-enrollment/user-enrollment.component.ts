import { PaymentService } from 'src/app/payment.service';
import { FoldersService } from './../folders.service';
import { Component } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EnrollmentService } from '../enrollment.service';
import { MatTableDataSource } from '@angular/material/table';
import { CoondidateService } from '../coondidate.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { combineLatest, filter, startWith } from 'rxjs';

@Component({
  selector: 'app-user-enrollment',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule

  ],
  templateUrl: './user-enrollment.component.html',
  styleUrl: './user-enrollment.component.css'
})
export class UserEnrollmentComponent {
  paymentMethods: any[]=[];
  data: any = {}; // Object to hold form data
  dataSource = new MatTableDataSource<Enrollment>();
  enrollments: any[] = []; // Assuming enrollments is an array of objects
  showForm: boolean = true; // Flag to determine whether to show add or edit form
  formMode: string = 'add'; // Initial form mode is 'add'
  enrollmentForm: FormGroup;
  //desiredLicenseCategories: string[] = [];
  desiredLicenseCategories!: { CategoryCode: string; }[];
  Students!: { CIN: string; }[];
  registrationFees: number = 0; // 
  paymentForm: FormGroup;

 
  enrollmentColumns: string[] = ['candidatCIN', 'candidatName', 'candidatBalance', 'registrationType', 'contratType', 'PricePerHour', 'paymentId', 'specialPrice', 'specialPriceAmount', 'registrationCosts', 'registrationFees', 'examDate', 'desiredLicenseCategory'];
  displayedColumns = [...this.enrollmentColumns, 'actions'];
  enrollmentControls: string[] = ['candidatCIN','candidatName', 'desiredLicenseCategory', 'registrationType', 'examDate'];

  constructor(private fb: FormBuilder,private router:Router ,private enrollmentService: EnrollmentService,private licenseService :FoldersService,private studentService:CoondidateService,private snackBar: MatSnackBar,private foldersService: FoldersService ,private paymentService:PaymentService) {
    this.enrollmentForm = this.fb.group({
      candidatCIN: ['', Validators.required],
      //candidatName: ['', Validators.required],
      desiredLicenseCategory: ['', Validators.required],
      registrationType: ['', Validators.required],
      registrationFees: [{ value: 0, disabled: true }, Validators.required],
      specialPrice: ['no', Validators.required], // required
      specialPriceAmount: [{ value: null, disabled: true }], // initially disabled if specialPrice is 'no'
      contratType: ['', Validators.required], // required
      paymentId:[null]
    });

    this.paymentForm= this.fb.group({
      paymentDate: ['', Validators.required],
      paymentAmount: ['', Validators.required],
      paymentMethod: [null, Validators.required], // Assuming this is the ID of the selected payment method
      candidatCIN: [null],
    })

    // Inside the constructor or ngOnInit method
this.enrollmentForm.get('registrationType')?.valueChanges.subscribe(registrationType => {
  const desiredLicenseCategory = this.enrollmentForm.get('desiredLicenseCategory')?.value;
  if (registrationType !== undefined && desiredLicenseCategory !== undefined) {
    this.getRegistrationFees(registrationType, desiredLicenseCategory);
  }
});

this.enrollmentForm.get('desiredLicenseCategory')?.valueChanges.subscribe(desiredLicenseCategory => {
  const registrationType = this.enrollmentForm.get('registrationType')?.value;
  if (registrationType !== undefined && desiredLicenseCategory !== undefined) {
    this.getRegistrationFees(registrationType, desiredLicenseCategory);
  }
});

    this.licenseService.getAllLc().subscribe(categories => {
      //this.desiredLicenseCategories = categories.map(category => category.CategoryCode);
      this.desiredLicenseCategories = categories
    });
  

    // Listen to changes in specialPrice field
    this.enrollmentForm.get('specialPrice')?.valueChanges.subscribe(value => {
      const specialPriceAmountControl = this.enrollmentForm.get('specialPriceAmount');
      if (value === 'yes') {
        specialPriceAmountControl?.enable();
        specialPriceAmountControl?.setValidators(Validators.required);
      } else {
        specialPriceAmountControl?.disable();
        specialPriceAmountControl?.clearValidators();
      }
      specialPriceAmountControl?.updateValueAndValidity();
    });
  }
 
     /*fetchStudents() {
      this.studentService.getAllStudents().subscribe((data: any) => {
        this.Students = data;
      });
    }*/
   
    
  ngOnInit() {
    this.fetchPaymentMethods()
  }


  toggleForm() {
    this.showForm = !this.showForm;
    this.formMode = 'add'; // Reset form mode to 'add' when toggling the form
    if (this.showForm) {
      this.enrollmentForm.reset(); // Reset form values when showing the form
      const registrationTypeControl = this.enrollmentForm.get('registrationType');
     if (registrationTypeControl) {
      registrationTypeControl.patchValue('code');
      registrationTypeControl.disable();
    }

    }
  }

   // Function to display a notification
  displayNotification(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Duration in milliseconds
    });
  }
 
    getRegistrationFees(registrationType: string, desiredLicenseCategory: string) {
      this.enrollmentService.getRegistrationFees(registrationType, desiredLicenseCategory)
        .subscribe((response: any) => {
          if (response && typeof response === 'object' && 'registrationFees' in response) {
            const fees = response.registrationFees;
            // Check if fees is a valid number
            if (!isNaN(fees) && isFinite(fees)) {
              // Update registrationFees control value
              this.enrollmentForm.get('registrationFees')?.setValue(fees);
              // Mark the control as dirty and update its validity
              this.enrollmentForm.get('registrationFees')?.markAsDirty();
              this.enrollmentForm.get('registrationFees')?.updateValueAndValidity();
            } else {
              console.error("Invalid registration fees value:", fees);
            }
          } else {
            console.error("Invalid response format:", response);
          }
        },
        (error) => {
          console.log("Error fetching registration fees:", error);
        }
      );
    }
    
    
  

  /*submitForm() {
    if (this.enrollmentForm.valid) {
      const formData = this.enrollmentForm.value;

      if (this.formMode === 'add') {
        this.enrollmentService.addEnrollment(formData).subscribe({
          next: (response) => {
            console.log('Enrollment added:', response);
            this.toggleForm();
            this.displayNotification('Enrollment added successfully.'); // Display notification
          },
          error: (error) => {
            console.error('Error adding enrollment:', error);
            this.displayNotification('Error adding enrollment. Please try again.'); // Display notification
          }
        });
      
    } else {
      console.error('Form validation failed.');
      this.displayNotification('Form validation failed. Please fill in all required fields.'); // Display notification
    }
  }}*/
  

   
      
  
canceladdForm() {
  this.showForm = false;
  this.router.navigate(['/']);

}


fetchPaymentMethods(): void {
  // Call payment service to fetch payment methods and assign them to paymentMethods array
    this.foldersService.getAllPaymentMethods().subscribe((methods:any[]) => {

    this.paymentMethods = methods;
  });
   
}

submitPaymentForm() {
  if (this.paymentForm.valid && this.enrollmentForm.get('candidatCIN')?.value) {
    console.log("Adding payment");

    const candidatCIN = this.enrollmentForm.get('candidatCIN')?.value;
    const paymentData = {
      paymentDate: this.paymentForm.get('paymentDate')?.value,
      paymentAmount: this.paymentForm.get('paymentAmount')?.value,
      paymentMethod: this.paymentForm.get('paymentMethod')?.value,
      candidatCIN: this.enrollmentForm.get('candidatCIN')?.value
    };
    console.log(paymentData)

    this.paymentService.addEnrollmentPayment(paymentData).subscribe({
      next: (response) => {
        console.log('Payment added:', response);
        this.enrollmentForm.patchValue({ paymentId: response.paymentId });

        const enrollmentData = { ...this.enrollmentForm.value, paymentId: response.id };
        console.log(enrollmentData)
        this.enrollmentService.addEnrollment(enrollmentData).subscribe({
          next: (enrollmentResponse) => {
            console.log('Enrollment added:', enrollmentResponse);
            this.router.navigate(['/auth/login']);
          },
          error: (error) => {
            console.error('Error adding enrollment:', error);
          }
        });
      },
      error: (error) => {
        console.error('Error adding payment:', error);
      }
    });
  } else {
    console.log("Invalid payment or candidatCIN is missing", this.paymentForm.value);
  }
}



/*submitForm() {
  if (this.enrollmentForm.valid) {
    const formData = this.enrollmentForm.value;

      this.enrollmentService.addEnrollment(formData).subscribe({
        next: (response) => {
          console.log('Enrollment added:', response);
          this.toggleForm();
          this.displayNotification('Enrollment added successfully.'); // Display notification
          this.submitPaymentForm(); // Call submitPaymentForm after enrollment submission
        },
        error: (error) => {
          console.error('Error adding enrollment:', error);
          this.displayNotification('Error adding enrollment. Please try again.'); // Display notification
        }
      });
    } else {
      console.error('Form validation failed.');
      this.displayNotification('Form validation failed. Please fill in all required fields.'); // Display notification
    }
  }*/
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
