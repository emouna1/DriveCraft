import { AuthService } from 'src/app/auth-service.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CoondidateService } from 'src/app/coondidate.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-personnel-edition',
  templateUrl: './personnel-edition.component.html',
  styleUrls: ['./personnel-edition.component.css']
})
export class PersonnelEditionComponent implements OnInit {
 

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog, private EmployeeService: CoondidateService,private authService: AuthService, private snackBar : MatSnackBar) { }

 
ngOnInit(): void {
  this.fetchData();
}



  
instructorColumns = [
  'username',
  'email',
  'name',
  'CIN',
  'dateOfBirth',
  'nationality',
  'address',
  'telephone',
  'image'
];
displayedColumns = this.instructorColumns.concat(['actions']);

showForm: boolean = false;
showEditForm: boolean = false;

selectedRow: Instructor = { User: {
  username: 'default_user',
  password: 'default_password',
  email: 'defaultEmployee@gmail.com',
  role: 'instructor',
  name: 'DefaultEmployee',
  firstName: 'Default',
  CIN: '1234567890',
  dateOfIssue: new Date(2000, 0, 1),
  licenseCategory: 'N/A',
  situation: 'N/A',
  balance: 0,
  dateOfBirth: new Date(1990, 0, 1),
  nationality: 'N/A',
  address: '123 Main Street',
  telephone: '123-456-7890',
  personalCode: null,
  personnelFunction: null,
  recruitmentDate: new Date(2000, 0, 1),
  netSalary: null,
  grossSalary: null,
  qualification: null,
  leaveDaysPerYear: null,
  cnssNumber: null,
  CategoryCode: null
}};
dataSource = new MatTableDataSource<Instructor>();





toggleForm() {
  this.showForm = !this.showForm;
}

fetchData() {
  this.EmployeeService.getAllُُُInstructors().subscribe((data: any) => {
    // Assuming data is fetched and structured as in your example
    this.dataSource.data = data.map((item: any) => {
      //const imageUrl = item.Image ? `http://localhost:3000/${item.Image.imageUrl.replace('\\', '/')}` : null;
      const imageUrl = item.image ? `http://localhost:3000/${item.image.replace(/\\/g, '/')}` : null;

      console.log('Image URL:', imageUrl); // Log the constructed image URL.replace('\\', '/')}

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
          situation: item.situation,
          balance: item.balance,
          dateOfBirth: item.dateOfBirth,
          nationality: item.nationality,
          address: item.address,
          telephone: item.telephone,
          personalCode: item.personalCode,
          personnelFunction: item.personnelFunction,
          recruitmentDate: item.recruitmentDate,
          netSalary: item.netSalary,
          grossSalary: item.grossSalary,
          qualification: item.qualification,
          leaveDaysPerYear: item.leaveDaysPerYear,
          cnssNumber: item.cnssNumber,
          CategoryCode: item.CategoryCode,
          image: imageUrl
        }
      };
    });
    this.dataSource.paginator = this.paginator;
  });
}


editRow(element: Instructor) {
  this.showEditForm = true;
  this.selectedRow = { ...element };
}


saveChanges() {
  if (this.selectedRow) {
    // Update selectedRow with the edited values before saving changes
    this.selectedRow = { ...this.selectedRow };
    if (this.selectedRow.User.image && this.selectedRow.User.image.includes('http://localhost:3000/')) {
      this.selectedRow.User.image = this.selectedRow.User.image.replace('http://localhost:3000/', '');
    }
    console.log(this.selectedRow)
    this.EmployeeService.editEmployee(this.selectedRow.User).subscribe(() => {
      console.log('Saved changes:', this.selectedRow);
      this.showEditForm = false;
      this.displayNotification('Instructor updated successfully !')
      this.fetchData(); // Refresh data after saving changes
    });
  }
}


deleteRow(element: Instructor) {
  if (element.User.CIN) {
    this.EmployeeService.deleteEmployee(element.User.CIN).subscribe(() => {
      console.log('Deleted row:', element.User);

      this.fetchData(); // Refresh data after deletion
      this.displayNotification('Deleted instructor !')
    });
  }
}


submitEmployee() {
  // Update selectedRow with the values entered in the form
  this.selectedRow = {
    User: { ...this.selectedRow.User }
  };
  console.log(this.selectedRow)
  // Now selectedRow contains the updated values entered by the user
  if (this.selectedRow) {
    this.authService.signup(this.selectedRow.User).subscribe(response => {
      this.resetForm();
      this.showForm=false;
      this.fetchData();
      this.displayNotification('New instructor added successfully')
    }, error => {
      console.error('Error adding instructor', error);
      this.displayNotification('Error adding instructor')

    });
  }
}

@ViewChild(MatPaginator) paginator!: MatPaginator;
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
      printContent += '<h2>Instructors list</h2>'
      printContent += '<table>';

      printContent += '<tr>';
      printContent += '<th>Username</th>';
      printContent += '<th>Email</th>';
      printContent += '<th>Name</th>';
      printContent += '<th>First Name</th>';
      printContent += '<th>CIN</th>';
      printContent += '<th>Date of Birth</th>';
      printContent += '<th>Nationality</th>';
      printContent += '<th>Address</th>';
      printContent += '<th>Telephone</th>';
      printContent += '<th>Image</th>';     
      printContent += '</tr>';
      this.dataSource.data.forEach(element => {
        printContent += '<tr>';
        printContent += '<td>' + element.User.username + '</td>';
        printContent += '<td>' + element.User.email + '</td>';
        printContent += '<td>' + element.User.name + '</td>';
        printContent += '<td>' + element.User.firstName + '</td>';
        printContent += '<td>' + element.User.CIN + '</td>';
        printContent += '<td>' + element.User.dateOfBirth + '</td>';
        printContent += '<td>' + element.User.nationality + '</td>';
        printContent += '<td>' + element.User.address + '</td>';
        printContent += '<td>' + element.User.telephone + '</td>';
        printContent += '<td>' + element.User.image + '</td>';
        //printContent += '<td>' + element.User.enrolledCourses + '</td>';
        //printContent += '<td>' + element.User.completedCourses + '</td>';
        //printContent += '<td>' + element.User.drivingExperience + '</td>';
        //printContent += '<td>' + element.User.notes + '</td>';
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
resetForm(){
  this.selectedRow = { 
    User: {
      username: 'default_user',
      password: 'default_password',
      email: 'defaultEmployee@gmail.com',
      role: 'admin',
      name: 'DefaultEmployee',
      firstName: 'Default',
      CIN: '1234567890',
      dateOfIssue: new Date(2000, 0, 1),
      licenseCategory: 'N/A',
      situation: 'N/A',
      balance: 0,
      dateOfBirth: new Date(1990, 0, 1),
      nationality: 'N/A',
      address: '123 Main Street',
      telephone: '123-456-7890',
      image: '_ _ _',
      personalCode: null,
      personnelFunction: null,
      recruitmentDate: new Date(2000, 0, 1),
      netSalary: null,
      grossSalary: null,
      qualification: null,
      leaveDaysPerYear: null,
      cnssNumber: null,
      CategoryCode: null
    }
  };
  this.fetchData();
}
cancelForm() {
  this.showEditForm = false; 
  this.resetForm()// Optionally reset the form fields

}
canceladdForm() {
  this.showForm = false; 
  this.resetForm()// Optionally reset the form fields
}

displayNotification(message: string) {
  this.snackBar.open(message, 'Close', {
    duration: 3000, // Duration in milliseconds
  });
}



}
interface Instructor {
  User :{
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
    personalCode?:String|null,
    personnelFunction?:String|null,
    recruitmentDate?:Date,
    netSalary?:number|null,
    grossSalary?:number|null,
    qualification?:string|null,
    leaveDaysPerYear?:number|null,
    cnssNumber?:string|null,
    CategoryCode?:string|null }
  }
  
