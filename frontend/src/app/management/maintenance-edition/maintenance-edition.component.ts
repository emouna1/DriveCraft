import { Component, ViewChild,ElementRef } from '@angular/core';
import { FoldersService } from './../../folders.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-maintenance-edition',
  templateUrl: './maintenance-edition.component.html',
  styleUrl: './maintenance-edition.component.css'
})
export class MaintenanceEditionComponent {

  displayedColumns = ['Mcode', 'designation' , 'actions'];
  dataSource = new MatTableDataSource<Entretien>();

  showForm: boolean = false;
  showEditForm: boolean = false;
  selectedRow: Entretien = { Mcode: 0, designation: '' };

   
  constructor(private foldersService: FoldersService,private snackBar: MatSnackBar) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //pagination 
   onPageChange(event: PageEvent) {
     this.dataSource.paginator!.pageIndex = event.pageIndex;
     this.dataSource.paginator!.pageSize = event.pageSize;
   }
  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.foldersService.getCarM().subscribe((data: Entretien[]) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;

    });
  }
  toggleForm() {
    this.showForm = !this.showForm;
  }

  editRow(element: Entretien) {
    this.showEditForm = true; // Show the edit form
    this.selectedRow = { ...element }; // Copy the selected row's data
  }

  saveChanges() {
    this.foldersService.editCarM(this.selectedRow.Mcode, this.selectedRow).subscribe(() => {
      this.showEditForm = false;
      this.fetchData();
      this.displayNotification('Maintenance entry edited successfully.'); // Display success notification
    }, error => {
      console.error('Error editing maintenance entry:', error);
      this.displayNotification('Error editing maintenance entry. Please try again.'); // Display error notification
    });
  }

  deleteRow(element: Entretien) {
    this.foldersService.deleteCarM(element.Mcode).subscribe(() => {
      this.fetchData();
      this.displayNotification('Maintenance entry deleted successfully.'); // Display success notification
    }, error => {
      console.error('Error deleting maintenance entry:', error);
      this.displayNotification('Error deleting maintenance entry. Please try again.'); // Display error notification
    });
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
        printContent += '<th>Code</th>';
        printContent += '<th>Designation</th>';
        printContent += '</tr>';

        // Generate table rows from dataSource
        this.dataSource.data.forEach(element => {
          printContent += '<tr>';
          printContent += '<td>' + element.Mcode + '</td>';
          printContent += '<td>' + element.designation + '</td>';
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
  
  submitCarMaintenance() {
    this.foldersService.addCarM(this.selectedRow).subscribe(response => {
      console.log('New Car maintenance added successfully', response);
      this.showForm = false; 
      this.fetchData();
      this.displayNotification('New maintenance entry added successfully.'); // Display success notification
    }, error => {
      console.error('Error adding new maintenance entry:', error);
      this.displayNotification('Error adding new maintenance entry. Please try again.'); // Display error notification
    });
  }
 
  
  cancelForm() {
    this.showEditForm = false; 
    this.fetchData()// Optionally reset the form fields
  }
  canceladdForm() {
    this.showForm = false; 
    this.fetchData()// Optionally reset the form fields
  }
  displayNotification(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Duration in milliseconds
    });
  }

}





export interface Entretien {
  Mcode: number;
  designation: string;
 
}


