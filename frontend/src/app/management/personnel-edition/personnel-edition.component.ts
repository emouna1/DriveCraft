import { AuthService } from 'src/app/auth-service.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CoondidateService } from 'src/app/coondidate.service';
interface Employee {
  User: {
    username: string;
    password: string;
    email: string;
    role: string;
    name: string;
    firstName: string;
    CIN: string;
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
    CategoryCode?:string
    [key: string]: any; // Index signature allowing dynamic property access

  };
}

@Component({
  selector: 'app-personnel-edition',
  templateUrl: './personnel-edition.component.html',
  styleUrls: ['./personnel-edition.component.css']
})
export class PersonnelEditionComponent implements OnInit {
  employeeForm!: FormGroup;
  dataSource = new MatTableDataSource<Employee>();
  showForm: boolean = false;
  showEditForm: boolean = false;
  selectedRow: Employee = {
    User: {
      username: 'default_user',
      password: 'default_password',
      email: 'defaultEmployee.com',
      role: 'instructor',
      name: 'DefaultEmployee',
      firstName: 'Default',
      CIN: '1234567890',
      dateOfIssue: new Date(2000, 0, 1),
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

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  employeeColumns = [
    'username', 'email', 'name', 'firstName', 'CIN', 'dateOfIssue', 'licenseCategory',
    'dateOfBirth', 'nationality', 'address', 'telephone', 'image', 'balance', 'personalCode',
    'personnelFunction', 'recruitmentDate', 'netSalary', 'grossSalary', 'qualification',
    'leaveDaysPerYear', 'cnssNumber'
  ];
  displayedColumns = [...this.employeeColumns, 'actions'];

  constructor(private formBuilder: FormBuilder, private EmployeeService: CoondidateService, private authService:AuthService) { }

  ngOnInit(): void {
    this.createForm();
    this.fetchData();
  }

  createForm(): void {
    this.employeeForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      name: ['', Validators.required],
      firstName: ['', Validators.required],
      CIN: ['', Validators.required],
      dateOfIssue: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      nationality: ['', Validators.required],
      address: ['', Validators.required],
      telephone: ['', Validators.required],
      image: ['', Validators.required],
      balance: ['', Validators.required],
      personalCode: ['', Validators.required],
      personnelFunction: ['', Validators.required],
      recruitmentDate: ['', Validators.required],
      netSalary: ['', Validators.required],
      grossSalary: ['', Validators.required],
      qualification: ['', Validators.required],
      leaveDaysPerYear: ['', Validators.required],
      cnssNumber: ['', Validators.required],
    });
  }

  fetchData(): void {
    this.EmployeeService.getAllُُُInstructors().subscribe((data: any) => {
      this.dataSource.data = data.map((item: any) => ({ User: { ...item } }));
    });
  }

  onPageChange(event: PageEvent): void {
    this.dataSource.paginator!.pageIndex = event.pageIndex;
    this.dataSource.paginator!.pageSize = event.pageSize;
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  editRow(element: Employee): void {
    this.employeeForm.patchValue(element);
    this.showEditForm = true;
    this.selectedRow = { ...element };
  }

  saveChanges(): void {
    this.EmployeeService.editEmployee(this.selectedRow.User).subscribe(() => {
      console.log('Saved changes:', this.selectedRow);
      this.showEditForm = false;
      this.fetchData();
    });
  }

  deleteRow(element: Employee): void {
    this.EmployeeService.deleteEmployee(element.User.username).subscribe(() => {
      console.log('Deleted row:', element.User);
      this.fetchData();
    });
  }

  submitEmployee(): void {
    this.authService.signup(this.selectedRow.User).subscribe(response => {
      console.log('New Employee added successfully', response);
      this.resetForm();
    }, error => {
      console.error('Error adding Employee', error);
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
        //printContent += '<th>Role</th>';
        printContent += '<th>Name</th>';
        //printContent += '<th>Last Name</th>';
        printContent += '<th>CIN</th>';
        printContent += '<th>Date of Issue</th>';
        printContent += '<th>Date of Birth</th>';
        printContent += '<th>Nationality</th>';
        printContent += '<th>Address</th>';
        printContent += '<th>Telephone</th>';
        //printContent += '<th>Balance</th>';
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
          //printContent += '<td>' + element.User.role + '</td>';
          printContent += '<td>' + element.User.name + '</td>';
          printContent += '<td>' + element.User.CIN + '</td>';
          printContent += '<td>' + element.User.dateOfIssue + '</td>';
          printContent += '<td>' + element.User.dateOfBirth + '</td>';
          printContent += '<td>' + element.User.nationality + '</td>';
          printContent += '<td>' + element.User.address + '</td>';
          printContent += '<td>' + element.User.telephone + '</td>';
          //printContent += '<td>' + element.User.balance + '</td>';
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
  resetForm(){
    this.selectedRow = { 
        User: {
          username: 'default_user',
          password: 'default_password',
          email: 'defaultEmployee.com',
          role: '',
          name: 'DefaultEmployee',
          firstName: 'Default',
          CIN: '1234567890',
          dateOfIssue: new Date(2000, 0, 1),
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
    this.fetchData();
  }
  cancelForm() {
    this.showEditForm = false; 
    this.showForm=false
    this.resetForm()// Optionally reset the form fields
  
  }
  
}
