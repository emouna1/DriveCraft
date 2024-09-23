import { AuthService } from 'src/app/auth-service.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CoondidateService } from 'src/app/coondidate.service';
import { MatDialog } from '@angular/material/dialog';

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
    image: string | null;
    personalCode?: string | null;
    personnelFunction?: string | null;
    recruitmentDate?: Date | null;
    netSalary?: number | null;
    grossSalary?: number | null;
    qualification?: string | null;
    leaveDaysPerYear?: number | null;
    cnssNumber: string | null;
    CategoryCode?: string;
    [key: string]: any;
  };
}

@Component({
  selector: 'app-personnel-edition',
  templateUrl: './personnel-edition.component.html',
  styleUrls: ['./personnel-edition.component.css']
})
export class PersonnelEditionComponent implements OnInit {
  employeeForm!: FormGroup; // The form group for adding or editing employees

  studentColumns = [
    'username',
    'email',
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
  dataSource = new MatTableDataSource<Employee>();
  showForm: boolean = false;
  showEditForm: boolean = false;
  selectedRow: Employee | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('printContent') printContent!: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private EmployeeService: CoondidateService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchData();

    // Initialize the form for adding/editing employees
    this.employeeForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      firstName: ['', Validators.required],
      CIN: ['', Validators.required],
      dateOfIssue: ['', Validators.required],
      situation: ['', Validators.required],
      balance: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      nationality: ['', Validators.required],
      address: ['', Validators.required],
      telephone: ['', Validators.required],
      image: ['']
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  fetchData() {
    this.EmployeeService.getAllُُُInstructors().subscribe((data: any) => {
      this.dataSource.data = data.map((item: any) => {
        const imageUrl = item.image ? `http://localhost:3000/${item.image.replace(/\\/g, '/')}` : null;
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

  editRow(element: Employee) {
    this.showEditForm = true;
    this.selectedRow = { ...element };

    // Patch form values with selected employee data
    this.employeeForm.patchValue({
      username: element.User.username,
      email: element.User.email,
      name: element.User.name,
      firstName: element.User.firstName,
      CIN: element.User.CIN,
      dateOfIssue: element.User.dateOfIssue,
      situation: element.User.situation,
      balance: element.User.balance,
      dateOfBirth: element.User.dateOfBirth,
      nationality: element.User.nationality,
      address: element.User.address,
      telephone: element.User.telephone,
      image: element.User.image
    });
  }

  saveChanges() {
    if (this.selectedRow) {
      const updatedEmployee = {
        ...this.selectedRow,
        User: {
          ...this.selectedRow.User,
          ...this.employeeForm.value // Update the selectedRow with form values
        }
      };

      this.EmployeeService.editEmployee(updatedEmployee.User).subscribe(() => {
        this.showEditForm = false;
        this.fetchData(); // Refresh data after saving changes
      });
    }
  }
  cancelForm() {
    this.showEditForm = false; 
    this.resetForm()// Optionally reset the form fields
  
  }
  deleteRow(element: Employee) {
    if (element.User.CIN) {
      this.EmployeeService.deleteEmployee(element.User.CIN).subscribe(() => {
        this.fetchData(); // Refresh data after deletion
      });
    }
  }

  submitEmployee() {
    const newEmployee = {
      User: { ...this.employeeForm.value }
    };

    this.authService.signup(newEmployee.User).subscribe(
      response => {
        this.resetForm();
        this.fetchData();
      },
      error => {
        console.error('Error adding employee', error);
      }
    );
  }

  resetForm() {
    this.employeeForm.reset();
    this.showForm = false;
    this.showEditForm = false;
  }

  onPageChange(event: PageEvent) {
    this.dataSource.paginator!.pageIndex = event.pageIndex;
    this.dataSource.paginator!.pageSize = event.pageSize;
  }

  printTable() {
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
        printContent += '<table><tr><th>Username</th><th>Email</th><th>Name</th><th>First Name</th><th>CIN</th><th>Situation</th><th>Date of Issue</th><th>Date of Birth</th><th>Nationality</th><th>Address</th><th>Telephone</th><th>Image</th><th>Balance</th></tr>';
        this.dataSource.data.forEach(element => {
          printContent += `<tr><td>${element.User.username}</td><td>${element.User.email}</td><td>${element.User.name}</td><td>${element.User.firstName}</td><td>${element.User.CIN}</td><td>${element.User.situation}</td><td>${element.User.dateOfIssue}</td><td>${element.User.dateOfBirth}</td><td>${element.User.nationality}</td><td>${element.User.address}</td><td>${element.User.telephone}</td><td>${element.User.image}</td><td>${element.User.balance}</td></tr>`;
        });
        printContent += '</table></body></html>';
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.print();
      }
    }
  }
}
