import { Component, ElementRef, ViewChild } from '@angular/core';
import { FoldersService } from '../../folders.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrl: './payment-method.component.css'
})
export class PaymentMethodComponent {
 
  
    displayedColumns = [ 'designation' , 'actions'];
    dataSource = new MatTableDataSource<method>();

    showForm: boolean = false;
    showEditForm: boolean = false;
    selectedRow: method = { id:0 ,designation: '' };
  
     
    constructor(private foldersService: FoldersService) {}
  
    ngOnInit() {
      this.fetchData();
    }
  
    fetchData() {
      this.foldersService.getAllPaymentMethods().subscribe((data: method[]) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;

      });
    }
    toggleForm() {
      this.showForm = !this.showForm;
    }
  
    editRow(element: method) {
      this.showEditForm = true; // Show the edit form
      this.selectedRow = { ...element }; // Copy the selected row's data
    }
  
    saveChanges() {
      // Here you can save the changes to the backend
      this.foldersService.editPaymentM(this.selectedRow.id, this.selectedRow).subscribe(() => {
        console.log('Saved changes:', this.selectedRow);
        this.showEditForm = false; // Hide the edit form after saving changes
      });
      this.fetchData();
    }
    deleteRow(element: method) {
      // Call deleteM function from the service to delete the row
      this.foldersService.deletePaymentM(element.id).subscribe(() => {
        console.log('Deleted row:', element);
        // After successful deletion, you might want to refresh the data
        this.fetchData();
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
          printContent += '<th>Method</th>';
          printContent += '<th>Designation</th>';
          printContent += '</tr>';
  
          // Generate table rows from dataSource
          this.dataSource.data.forEach(element => {
            printContent += '<tr>';
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
    submitNewPm() {
      this.foldersService.addPaymentM(this.selectedRow).subscribe(response => {
        console.log("adding ",this.selectedRow)
        console.log('New method maintenance added successfully', response);
        this.resetForm();
      }, error => {
        console.error('Error !!!', error);
      });
    }
    resetForm() {
      // Reset selectedRow object or any other form reset logic
      window.location.reload();
    }
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    //pagination 
     onPageChange(event: PageEvent) {
       this.dataSource.paginator!.pageIndex = event.pageIndex;
       this.dataSource.paginator!.pageSize = event.pageSize;
     }
     cancelForm() {
      this.showEditForm = false; 
      this.resetForm();
    }
    canceladdForm() {
      this.showForm = false; 
      this.resetForm();
    }
  }
  
  
  
  
  
  export interface method {
    id: number;
    designation: string;
   
  }
  
  
  

