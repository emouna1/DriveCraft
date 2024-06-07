

import { AfterViewInit, Component,  ElementRef,  ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/auth-service.service';
import { CoondidateService } from 'src/app/coondidate.service';
@Component({
  selector: 'app-manage-students',
  templateUrl: './manage-students.component.html',
  styleUrl: './manage-students.component.css'
})
export class ManageStudentsComponent implements AfterViewInit {
 
  userId!: string;
  selectedFile: File | null = null;

 
  allColumns = [
    'username',
    'email',
    'name',
    'CIN',
    'situation',
    'balance',
    'dateOfBirth',
    'nationality',
    'address',
    'telephone',
    'image',
    'CategoryCode'
  ];
  editableFields = [
    'firstName',
    'email',
    'situation',
    'dateOfBirth',
    'nationality',
    'address',
    'telephone',
  ];
  displayedColumns = this.allColumns.concat(['actions']);
  showForm: boolean = false;
  showEditForm: boolean = false;

  selectedRow: Student = { student: {
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
    CategoryCode:'A'
  }};
  dataSource = new MatTableDataSource<Student>();

  constructor(private studentService: CoondidateService, private dialog: MatDialog, private authService: AuthService) { }

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userId = user.id;
      this.fetchData();
    }
  }

  fetchData() {
    this.studentService.getStudentsForInstructor(this.userId).subscribe((data: any) => {
      this.dataSource.data = data.map((item: any) => {
        const imageUrl = item.student.image ? `http://localhost:3000/${item.student.image}` : null;
        return {
          student: {
            username: item.student.username,
            password: item.student.password,
            email: item.student.email,
            role: item.student.role,
            name: item.student.name,
            firstName: item.student.firstName,
            CIN: item.student.CIN,
            dateOfIssue: item.student.dateOfIssue,
            situation: item.student.situation,
            balance: item.student.balance,
            dateOfBirth: item.student.dateOfBirth,
            nationality: item.student.nationality,
            address: item.student.address,
            telephone: item.student.telephone,
            image: imageUrl,
            CategoryCode: item.student.CategoryCode
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

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }
  }

  saveChanges() {
    if (this.selectedRow) {
      // Ensure CIN is a string
      const cin = this.selectedRow.student.CIN;
      if (typeof cin !== 'string') {
        console.error('CIN must be a string.');
        return;
      }
  
      const formData = new FormData();
      Object.keys(this.selectedRow.student).forEach(key => {
        formData.append(key, (this.selectedRow.student as any)[key]);
      });
  
      // Append the CIN separately to the form data
      formData.append('CIN', cin);
  
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }
  
      // Make sure to use the correct parameter for the CIN value in updateUser
      this.studentService.updateUser(cin, formData).subscribe(() => {
        this.showEditForm = false;
        this.fetchData();
      });
    }
  }
  
  cancelForm() {
    this.showEditForm = false;
    this.resetForm();
  }

  resetForm() {
    this.selectedRow = { 
      student: {
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
        CategoryCode:'A'
      }
    };
    this.fetchData();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  onPageChange(event: PageEvent) {
    this.dataSource.paginator!.pageIndex = event.pageIndex;
    this.dataSource.paginator!.pageSize = event.pageSize;
  }

  @ViewChild('printContent') printContent!: ElementRef;

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
        printContent += '<table>';
        printContent += '<tr>';
        this.allColumns.forEach(col => {
          printContent += `<th>${col}</th>`;
        });
        printContent += '</tr>';
        this.dataSource.data.forEach(element => {
          printContent += '<tr>';
          this.allColumns.forEach(col => {
            printContent += `<td>${(element.student as any)[col]}</td>`;
          });
          printContent += '</tr>';
        });
        printContent += '</table>';
        printContent += '</body></html>';
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.print();
      }
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}

interface Student {
  student: {
    [key: string]: any;
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
    CategoryCode: string;
  }
}