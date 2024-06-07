import { Component,  ElementRef,  ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/auth-service.service';
import { CoondidateService } from 'src/app/coondidate.service';
@Component({
  selector: 'app-condidate-edition',
  templateUrl: './condidate-edition.component.html',
  styleUrl: './condidate-edition.component.css'
})
export class CondidateEditionComponent {


  
studentColumns = [
  'username',
  'email',
  //'role',
  'name',
  'firstName',
  'CIN',
  'dateOfIssue',
  'situation',
  'balance',
  'dateOfBirth',
  'nationality',
  'address',
  'telephone',
  'image'
];
displayedColumns = this.studentColumns.concat(['actions']);

showForm: boolean = false;
showEditForm: boolean = false;
//selectedRow: Student | null = null;

selectedRow: Student = { User :{
  username: 'default_user',
  password: 'default_password',
  email: 'default@student.com',
  role: 'student',
  name: 'Default Student',
  firstName: 'Default',
  CIN: '1234567890',
  dateOfIssue: new Date(2000, 0, 1),
  situation: 'N/A',
  balance: 0,
  dateOfBirth: new Date(1990, 0, 1),
  nationality: 'N/A',
  address: '123 Main Street',
  telephone: '123-456-7890',
  image: null,
  personalCode:null,
  personnelFunction:null,
  recruitmentDate:null,
  netSalary:null,
  grossSalary:null,
  qualification:null,
  leaveDaysPerYear:null,
  cnssNumber:null,
  CategoryCode:'A'
}};
dataSource = new MatTableDataSource<Student>();

constructor(private studentService: CoondidateService, private dialog: MatDialog, private authService: AuthService) { }

ngOnInit(): void {
  this.fetchData();
}


toggleForm() {
  this.showForm = !this.showForm;
}
/*fetchData() {
  this.studentService.getAllStudents().subscribe((data: any) => {
    // Assuming data is fetched and structured as in your example
    this.dataSource.data= data.map((item: any) => {
      console.log('Image URL:', item.Image ? item.Image.imageUrl : null); // Add this line to log the image URL

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
          //image: item.image,
          personalCode: item.personalCode,
          personnelFunction: item.personnelFunction,
          recruitmentDate: item.recruitmentDate,
          netSalary: item.netSalary,
          grossSalary: item.grossSalary,
          qualification: item.qualification,
          leaveDaysPerYear: item.leaveDaysPerYear,
          cnssNumber: item.cnssNumber,
          CategoryCode: item.CategoryCode,
          //image: item.image // Assign image property
          //image: item.Image ? item.Image.imageUrl : null,
          image: item.Image ? `http://localhost:3000/images/${item.Image.imageUrl}` : null,


        }
      };
    });
    this.dataSource.paginator = this.paginator;
  });
}*/
fetchData() {
  this.studentService.getAllStudents().subscribe((data: any) => {
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


editRow(element: Student) {
  this.showEditForm = true;
  this.selectedRow = { ...element };
}


saveChanges() {
  if (this.selectedRow) {
    // Update selectedRow with the edited values before saving changes
    this.selectedRow = { ...this.selectedRow };

    this.studentService.editStudent(this.selectedRow.User).subscribe(() => {
      console.log('Saved changes:', this.selectedRow);
      this.showEditForm = false;
      this.fetchData(); // Refresh data after saving changes
    });
  }
}


deleteRow(element: Student) {
  if (element.User.CIN) {
    this.studentService.deleteStudent(element.User.CIN).subscribe(() => {
      console.log('Deleted row:', element.User);
      this.fetchData(); // Refresh data after deletion
    });
  }
}


submitStudent() {
  // Update selectedRow with the values entered in the form
  this.selectedRow = {
    User: { ...this.selectedRow.User }
  };

  // Now selectedRow contains the updated values entered by the user
  if (this.selectedRow) {
    this.authService.signup(this.selectedRow.User).subscribe(response => {
      console.log('New student added successfully', response);
      this.resetForm();
    }, error => {
      console.error('Error adding student', error);
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

      printContent += '<table>';
      printContent += '<tr>';
      printContent += '<th>Username</th>';
     // printContent += '<th>Password</th>';
      printContent += '<th>Email</th>';
      //printContent += '<th>Role</th>';
      printContent += '<th>Name</th>';
      printContent += '<th>First Name</th>';
      //printContent += '<th>Last Name</th>';
      printContent += '<th>CIN</th>';
      printContent += '<th>Situation</th>';
      printContent += '<th>Date of Issue</th>';
      printContent += '<th>Date of Birth</th>';
      printContent += '<th>Nationality</th>';
      printContent += '<th>Address</th>';
      printContent += '<th>Telephone</th>';
      printContent += '<th>Image</th>';
      printContent += '<th>Balance</th>';
     
      printContent += '</tr>';

      this.dataSource.data.forEach(element => {
        printContent += '<tr>';
        printContent += '<td>' + element.User.username + '</td>';
       // printContent += '<td>' + element.User.password + '</td>';
        printContent += '<td>' + element.User.email + '</td>';
       // printContent += '<td>' + element.User.role + '</td>';
        printContent += '<td>' + element.User.name + '</td>';
        printContent += '<td>' + element.User.firstName + '</td>';
        printContent += '<td>' + element.User.CIN + '</td>';
        printContent += '<td>' + element.User.situation + '</td>';
        printContent += '<td>' + element.User.dateOfIssue + '</td>';
        printContent += '<td>' + element.User.dateOfBirth + '</td>';
        printContent += '<td>' + element.User.nationality + '</td>';
        printContent += '<td>' + element.User.address + '</td>';
        printContent += '<td>' + element.User.telephone + '</td>';
        printContent += '<td>' + element.User.image + '</td>';
        printContent += '<td>' + element.User.balance + '</td>';
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
      email: 'default@student.com',
      role: 'student',
      name: 'Default Student',
      firstName: 'Default',
      CIN: '1234567890',
      dateOfIssue: new Date(2000, 0, 1),
      situation: 'N/A',
      balance: 0,
      dateOfBirth: new Date(1990, 0, 1),
      nationality: 'N/A',
      address: '123 Main Street',
      telephone: '123-456-7890',
      image: null,
      personalCode:null,
      personnelFunction:null,
      recruitmentDate:null,
      netSalary:null,
      grossSalary:null,
      qualification:null,
      leaveDaysPerYear:null,
      cnssNumber:null,
      CategoryCode:'A'
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

}
interface Student {
  User: {

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
  image: string |null;
  personalCode?:String|null
  personnelFunction?:String|null
  recruitmentDate?:Date|null
  netSalary?:number|null
  grossSalary?:number|null
  qualification?:string|null
  leaveDaysPerYear?:number|null
  cnssNumber:string |null
 CategoryCode?:string}}
