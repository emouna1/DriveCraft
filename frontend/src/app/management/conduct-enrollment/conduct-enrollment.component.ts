import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { CoondidateService } from 'src/app/coondidate.service';
import { EnrollmentService } from 'src/app/enrollment.service';
import { FoldersService } from 'src/app/folders.service';

@Component({
  selector: 'app-conduct-enrollment',
  templateUrl: './conduct-enrollment.component.html',
  styleUrl: './conduct-enrollment.component.css'
})
export class ConductEnrollmentComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  data: any = {}; // Object to hold form data
  dataSource = new MatTableDataSource<Enrollment>();
  enrollments: any[] = []; // Assuming enrollments is an array of objects
  showForm: boolean = false; // Flag to determine whether to show add or edit form
  formMode: string = 'add'; // Initial form mode is 'add'
  enrollmentForm: FormGroup;
  //desiredLicenseCategories: string[] = [];
  desiredLicenseCategories!: { CategoryCode: string; }[];
  Students!: { CIN: string; }[];

 
  enrollmentColumns: string[] = ['candidatCIN', 'candidatName', 'candidatBalance', 'registrationType', 'contratType', 'PricePerHour', 'paymentId', 'specialPrice', 'specialPriceAmount', 'registrationCosts', 'registrationFees', 'examDate', 'desiredLicenseCategory'];
  displayedColumns = [...this.enrollmentColumns, 'actions'];
  enrollmentControls: string[] = ['candidatCIN','candidatName', 'desiredLicenseCategory', 'registrationType', 'examDate'];

  constructor(private fb: FormBuilder,private enrollmentService: EnrollmentService,private licenseService :FoldersService,private studentService:CoondidateService,private snackBar : MatSnackBar ) {
    this.enrollmentForm = this.fb.group({
      candidatName: ['', Validators.required],
      desiredLicenseCategory: ['', Validators.required],
      registrationType: ['', Validators.required],
      //examDate: ['', Validators.required]
      examDate: [null], // nullable
      registrationCosts: ['', Validators.required], // required
      specialPrice: ['no', Validators.required], // required
      specialPriceAmount: [{ value: null, disabled: true }], // initially disabled if specialPrice is 'no'
      contratType: ['', Validators.required], // required
      paymentId: [null] // nullable
    });
    this.licenseService.getAllLc().subscribe(categories => {
      //this.desiredLicenseCategories = categories.map(category => category.CategoryCode);
      this.desiredLicenseCategories = categories
    });
    
    this.fetchStudents()
    const registrationTypeControl = this.enrollmentForm.get('registrationType');
    if (registrationTypeControl) {
      registrationTypeControl.patchValue('conduct');
      registrationTypeControl.disable();
    }
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
      // Assuming data is fetched and structured as in your example
      this.Students= data.map((item: any) => {
        return {
          User: {
            username: item.username,
            password: item.password,
            email: item.email,
            role: item.role,
            name: item.name,
            firstName: item.firstName,
            CIN: item.CIN,
            dateOfIssue: item.dateOfIssue,
            licenseCategory: item.licenseCategory,
            situation: item.situation,
            balance: item.balance,
            dateOfBirth: item.dateOfBirth,
            nationality: item.nationality,
            address: item.address,
            telephone: item.telephone,
            image: item.image,
            personalCode: item.personalCode,
            personnelFunction: item.personnelFunction,
            recruitmentDate: item.recruitmentDate,
            netSalary: item.netSalary,
            grossSalary: item.grossSalary,
            qualification: item.qualification,
            leaveDaysPerYear: item.leaveDaysPerYear,
            cnssNumber: item.cnssNumber,
            CategoryCode: item.CategoryCode
          }
        };}
     ) })}*/
     fetchStudents() {
      this.studentService.getAllStudents().subscribe((data: any) => {
        this.Students = data;
      });
    }
    
  ngOnInit() {
    this.fetchEnrollments()
  }
  fetchEnrollments(){this.enrollmentService.getConductEnrollments()
      .subscribe((data: any) => {
        /*enrollments => {
        this.enrollments = enrollments;
        console.log(enrollments)*/
        console.log(data)
        this.dataSource.data = data;
        console.log(this.dataSource)
        this.dataSource.paginator = this.paginator;
        // Initialize detailsVisible property for each enrollment
        this.enrollments.forEach(enrollment => enrollment.detailsVisible = false);
      });}

  toggleForm() {
    this.showForm = !this.showForm;
    this.formMode = 'add'; // Reset form mode to 'add' when toggling the form
    if (this.showForm) {
      this.enrollmentForm.reset(); // Reset form values when showing the form
      const registrationTypeControl = this.enrollmentForm.get('registrationType');
     if (registrationTypeControl) {
      registrationTypeControl.patchValue('conduct');
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

  // Other existing methods...

  submitForm() {
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
      } else if (this.formMode === 'edit') {
        this.enrollmentService.editEnrollment(formData).subscribe(
          (response) => {
            console.log('Enrollment edited:', response);
            this.toggleForm();
            this.displayNotification('Enrollment edited successfully.'); // Display notification
          },
          (error) => {
            console.error('Error editing enrollment:', error);
            this.displayNotification('Error editing enrollment. Please try again.'); // Display notification
          }
        );
      }
    } else {
      console.error('Form validation failed.');
      this.displayNotification('Form validation failed. Please fill in all required fields.'); // Display notification
    }
  }

  editEnrollment(enrollment: any) {
    this.formMode = 'edit';
    // Populate form with the selected enrollment's data
    this.enrollmentForm.patchValue(enrollment);
    this.showForm = true; // Show the form for editing
  }

  deleteEnrollment(enrollment: Enrollment) {
    // Implement delete functionality
    this.enrollmentService.deleteEnrollment(enrollment.id)
      .subscribe(
        () => {
          // Remove the deleted enrollment from the list
          this.enrollments = this.enrollments.filter(e => e !== enrollment);
          console.log('Deleted enrollment:', enrollment);
          this.fetchEnrollments();
          this.displayNotification('Enrollment deleted successfully.'); // Display success notification
        },
        (error) => {
          console.error('Error deleting enrollment:', error);
          this.displayNotification('Error deleting enrollment. Please try again.'); // Display error notification
        }
      );
  }
  
  
    //pagination 
    onPageChange(event: PageEvent) {
      this.dataSource.paginator!.pageIndex = event.pageIndex;
      this.dataSource.paginator!.pageSize = event.pageSize;
    }
    @ViewChild('printContent') printContent!: ElementRef;

printTable() {
  console.log('Printing table...');

  if (this.printContent && this.printContent.nativeElement) {
    const printWindow = window.open('', '_blank');

    if (printWindow) {
      let printContent = '<html><head><title>Print</title>';
      printContent += '<style>';
      printContent += 'table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }';
      printContent += 'th, td { border: 1px solid #dddddd; text-align: left; padding: 8px; }';
      printContent += 'tr:nth-child(even) { background-color: #f2f2f2; }';
      printContent += '</style>';
      printContent += '</head><body>';

      // Generate table headers
      printContent += '<table>';
      printContent += '<tr>';
      printContent += '<th>Candidat CIN</th>';
      printContent += '<th>Candidat name</th>';
      printContent += '<th>Candidat balance</th>';
      printContent += '<th>Registration type</th>';
      printContent += '<th>Contract type</th>';
      printContent += '<th>Price per hour</th>';
      printContent += '<th>Registration Fees</th>';
      printContent += '<th>Desired license category</th>';
      printContent += '<th>Exam date</th>';
      printContent += '</tr>';

      // Generate table rows from dataSource
      this.dataSource.data.forEach(element => {
        printContent += '<tr>';
        printContent += '<td>' + element.candidatCIN + '</td>';
        printContent += '<td>' + element.candidatName + '</td>';
        printContent += '<td>' + element.candidatBalance + '</td>';
        printContent += '<td>' + element.registrationType + '</td>';
        printContent += '<td>' + element.contratType + '</td>';
        printContent += '<td>' + element.PricePerHour+ '</td>';
        printContent += '<td>' + element.registrationFees + '</td>';
        printContent += '<td>' + element.desiredLicenseCategory + '</td>';
        printContent += '<td>' + element.examDate+ '</td>';
        printContent += '</tr>';
      });

      printContent += '</table>';
      printContent += '</body></html>';

      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    } else {
      console.error('Failed to open print window');
    }
  } else {
    console.error('Print content not found or not initialized');
  }
}
canceladdForm() {
  this.showForm = false;
  this.resetForm(); // Optionally reset the form fields
}
resetForm() {
 this.fetchEnrollments()


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
