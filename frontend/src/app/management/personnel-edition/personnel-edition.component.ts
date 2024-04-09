import { Component, OnInit, ViewChild } from '@angular/core';
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
    licenseCategory: string;
    situation: string;
    balance: number;
    dateOfBirth: Date;
    nationality: string;
    address: string;
    telephone: string;
    image: string;
    personalCode: string;
    personnelFunction: string;
    recruitmentDate: Date;
    netSalary: number;
    grossSalary: number;
    qualification: string;
    leaveDaysPerYear: number;
    cnssNumber: string;
    CategoryCode: string;
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

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  employeeColumns = [
    'username', 'email', 'role', 'name', 'firstName', 'CIN', 'dateOfIssue', 'licenseCategory',
    'dateOfBirth', 'nationality', 'address', 'telephone', 'image', 'balance', 'personalCode',
    'personnelFunction', 'recruitmentDate', 'netSalary', 'grossSalary', 'qualification',
    'leaveDaysPerYear', 'cnssNumber'
  ];
  displayedColumns = [...this.employeeColumns, 'actions'];

  constructor(private formBuilder: FormBuilder, private EmployeeService: CoondidateService) { }

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
      licenseCategory: ['', Validators.required],
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
    this.EmployeeService.getAllُُُAdmins().subscribe((data: any) => {
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
    this.showEditForm = true;
    this.selectedRow = { ...element };
  }

  resetForm(): void {
    window.location.reload();
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
    this.EmployeeService.addEmployee(this.selectedRow.User).subscribe(response => {
      console.log('New Employee added successfully', response);
      this.resetForm();
    }, error => {
      console.error('Error adding Employee', error);
    });
  }
}
