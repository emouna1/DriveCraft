import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CoondidateService } from 'src/app/coondidate.service';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrl: './admins.component.css'
})
export class AdminsComponent {


  employeeColumns = [
    'username',
    'email',
    'role',
    'name',
    'firstName',
    'CIN',
    'dateOfIssue',
    'licenseCategory',
    'dateOfBirth',
    'nationality',
    'address',
    'telephone',
    'image',
    'balance',
    'personalCode',
    'personnelFunction',
    'recruitmentDate',
    'netSalary',
    'grossSalary',
    'qualification',
    'leaveDaysPerYear',
    'cnssNumber'
  ];
  displayedColumns = this.employeeColumns.concat(['actions']);
  
  //dataSource: Employee[] = [];
  dataSource = new MatTableDataSource<Employee>();

  showForm: boolean = false;
  showEditForm: boolean = false;
  selectedRow: Employee = {
    User: {
      username: 'default_user',
      password: 'default_password',
      email: 'defaultEmployee.com',
      role: '',
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
      personalCode: '',
      personnelFunction: '',
      recruitmentDate: new Date(2000, 0, 1),
      netSalary: 0,
      grossSalary: 0,
      qualification: '',
      leaveDaysPerYear: 0,
      cnssNumber: '',
      CategoryCode: ''
    }
  };
  
  
  constructor(private EmployeeService: CoondidateService) { }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
 //pagination 
  onPageChange(event: PageEvent) {
    this.dataSource.paginator!.pageIndex = event.pageIndex;
    this.dataSource.paginator!.pageSize = event.pageSize;
  }
  ngOnInit(): void {
    this.fetchData();
  }
  
  fetchData() {
    this.EmployeeService.getAllُُُInstructors().subscribe((data: any) => {
      // Assuming data is fetched and structured as in your example
      this.dataSource.data = data.map((item: any) => {
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
        };
      });
    });
  }
  
  
  
  toggleForm() {
    this.showForm = !this.showForm;
  }
  
  editRow(element:Employee) {
    this.showEditForm = true;
    this.selectedRow = { ...element };
  }
  
  
  
  resetForm() {
    // Reset selectedRow object or any other form reset logic
    window.location.reload();
  }
  

  saveChanges() {
    this.EmployeeService.editEmployee(this.selectedRow.User).subscribe(() => {
      console.log('Saved changes:', this.selectedRow);
      this.showEditForm = false;
      this.fetchData(); // Refresh data after saving changes
    });
  }
  
  deleteRow(element: Employee) {
    this.EmployeeService.deleteEmployee(element.User.username).subscribe(() => {
      console.log('Deleted row:', element.User);
      this.fetchData(); // Refresh data after deletion
    });
  }
  
  submitEmployee() {
    this.EmployeeService.addEmployee(this.selectedRow.User).subscribe(response => {
      console.log('NewEmployee added successfully', response);
      this.resetForm();
    }, error => {
      console.error('Error addingEmployee', error);
    });
  }
  
  @ViewChild('printContent') printContent!: ElementRef;
  
  printTable() {
    console.log('Printing table...');
  
    if (this.printContent && this.printContent.nativeElement.User) {
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
        printContent += '<th>Password</th>';
        printContent += '<th>Email</th>';
        printContent += '<th>Role</th>';
        printContent += '<th>Name</th>';
        printContent += '<th>Last Name</th>';
        printContent += '<th>CIN</th>';
        printContent += '<th>Date of Issue</th>';
        printContent += '<th>License Category</th>';
        printContent += '<th>Date of Birth</th>';
        printContent += '<th>Nationality</th>';
        printContent += '<th>Address</th>';
        printContent += '<th>Telephone</th>';
        printContent += '<th>Balance</th>';
        printContent +=   '<th>personalCode</th>';
        printContent +=   '<th>personnelFunction</th>';
        printContent +=    '<th>recruitmentDate</th>';
        printContent +=   '<th> netSalary </th>';
        printContent +=   '<th> qualification </th>' ;
        printContent +=    '<th>  leaveDaysPerYear </th>' ;
        printContent +=    '<th> cnssNumber </th>' ;
       
        printContent += '</tr>';
  
        this.dataSource.data.forEach(element => {
          printContent += '<tr>';
          printContent += '<td>' + element.User.username + '</td>';
          printContent += '<td>' + element.User.password + '</td>';
          printContent += '<td>' + element.User.email + '</td>';
          printContent += '<td>' + element.User.role + '</td>';
          printContent += '<td>' + element.User.name + '</td>';
          printContent += '<td>' + element.User.CIN + '</td>';
          printContent += '<td>' + element.User.dateOfIssue + '</td>';
          printContent += '<td>' + element.User.licenseCategory + '</td>';
          printContent += '<td>' + element.User.dateOfBirth + '</td>';
          printContent += '<td>' + element.User.nationality + '</td>';
          printContent += '<td>' + element.User.address + '</td>';
          printContent += '<td>' + element.User.telephone + '</td>';
          printContent += '<td>' + element.User.balance + '</td>';
          printContent += '<td>' + element.User.personalCode + '</td>';
          printContent += '<td>' + element.User.personnelFunction + '</td>';
          printContent += '<td>' + element.User.recruitmentDate + '</td>';
          printContent += '<td>' + element.User.netSalary + '</td>';
          printContent += '<td>' + element.User.qualification + '</td>';
          printContent += '<td>' + element.User.leaveDaysPerYear + '</td>';
          printContent += '<td>' + element.User.cnssNumber + '</td>';
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
  
  }
  interface Employee {
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
    personalCode?:String,
    personnelFunction?:String,
    recruitmentDate?:Date,
    netSalary?:number,
    grossSalary?:number
    qualification?:string,
    leaveDaysPerYear?:number,
    cnssNumber?:string,
    CategoryCode?:string }}

    