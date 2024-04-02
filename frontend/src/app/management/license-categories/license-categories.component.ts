import { Component, ElementRef, ViewChild } from '@angular/core';
import { FoldersService } from '../../folders.service';

@Component({
  selector: 'app-license-categories',
  templateUrl: './license-categories.component.html',
  styleUrl: './license-categories.component.css'
})
export class LicenseCategoriesComponent {
  Columns = ['Rank', 'CategoryCode' , 'Designation' , 'CodeRegistrationFees' ,'ConductRegistrationFees', 'CodeReviewPrice' , 'DrivingTestPrice' , 'PriceHourCode' ,'PricePerHourDriven' , 'CodeExamCancellationFee' , 'DrivingTestCancellationFees' ];
  displayedColumns = this.Columns.concat(['actions']);

  dataSource: PeriodicElement[] = [];
  showForm: boolean = false;
  showEditForm: boolean = false;
  //licenseCategoryData: any = {}; // Object to hold form data


  selectedRow: PeriodicElement = { Rank: 0,
    CategoryCode: '',
    Designation: '',
    CodeRegistrationFees: 0,
    ConductRegistrationFees: 0,
    CodeReviewPrice: 0,
    DrivingTestPrice: 0,
    PriceHourCode: 0,
    PricePerHourDriven: 0,
    CodeExamCancellationFee: 0,
    DrivingTestCancellationFees: 0, };

   
  constructor(private foldersService: FoldersService) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.foldersService.getAllLc().subscribe((data: PeriodicElement[]) => {
      this.dataSource = data;
      console.log(data)
    });
  }
  toggleForm() {
    this.showForm = !this.showForm;
  }

  editRow(element: PeriodicElement) {
    this.showEditForm = true; // Show the edit form
    this.selectedRow = { ...element }; // Copy the selected row's data
  }

  saveChanges() {
    // Here you can save the changes to the backend
    this.foldersService.editLcategory(this.selectedRow.CategoryCode, this.selectedRow).subscribe(() => {
      console.log('Saved changes:', this.selectedRow);
      this.showEditForm = false; // Hide the edit form after saving changes
    });
    this.fetchData();
  }
  deleteRow(element: PeriodicElement) {
    // Call deleteM function from the service to delete the row
    this.foldersService.deleteLcategory(element.CategoryCode).subscribe(() => {
      console.log('Deleted row:', element);
      // After successful deletion, you might want to refresh the data
      this.fetchData();
    });}



      submitLicenseCategory() {
        // Assuming selectedRow is already defined in your component
        // Assuming addLc method exists in your DataService
    
        // Call addLc from DataService passing selectedRow
        this.foldersService.addLc(this.selectedRow)
          .subscribe(response => {
            // Handle response if needed
            console.log('New license category added successfully', response);
            // Optionally, you can reset the form after successful submission
            this.resetForm();
            this.fetchData();
          }, error => {
            // Handle error if needed
            console.error('Error adding license category', error);
          });
      }
    
      resetForm() {
        // Reset selectedRow object or any other form reset logic
       // this.selectedRow = {}; // Assuming selectedRow is an object
       window.location.reload();

      }
    
    



  



 @ViewChild('printContent') printContent!: ElementRef; // Declare ViewChild here

  
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
      printContent += '<th>Rank</th>';
      printContent += '<th>Category Code</th>';
      printContent += '<th>Designation</th>';
      printContent += '<th>Code Registration Fees</th>';
      printContent += '<th>Conduct Registration Fees</th>';
      printContent += '<th>Code Review Price</th>';
      printContent += '<th>Driving Test Price</th>';
      printContent += '<th>Price Hour Code</th>';
      printContent += '<th>Price Per Hour Driven</th>';
      printContent += '<th>Code Exam Cancellation Fee</th>';
      printContent += '<th>Driving Test Cancellation Fees</th>';
      printContent += '</tr>';

      // Generate table rows from dataSource
      this.dataSource.forEach(element => {
        printContent += '<tr>';
        printContent += '<td>' + element.Rank + '</td>';
        printContent += '<td>' + element.CategoryCode + '</td>';
        printContent += '<td>' + element.Designation + '</td>';
        printContent += '<td>' + element.CodeRegistrationFees + '</td>';
        printContent += '<td>' + element.ConductRegistrationFees + '</td>';
        printContent += '<td>' + element.CodeReviewPrice + '</td>';
        printContent += '<td>' + element.DrivingTestPrice + '</td>';
        printContent += '<td>' + element.PriceHourCode + '</td>';
        printContent += '<td>' + element.PricePerHourDriven + '</td>';
        printContent += '<td>' + element.CodeExamCancellationFee + '</td>';
        printContent += '<td>' + element.DrivingTestCancellationFees + '</td>';
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





export interface PeriodicElement {
Rank: number,
CategoryCode: string,

Designation: string,

CodeRegistrationFees: number,

ConductRegistrationFees: number,

CodeReviewPrice: number,

DrivingTestPrice: number,

PriceHourCode: number,
PricePerHourDriven:number,
CodeExamCancellationFee: number,
DrivingTestCancellationFees: number,
 
}


