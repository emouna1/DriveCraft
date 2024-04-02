import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { VehiclesEditionService } from 'src/app/vehicles-edition.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-vehicle-edition',
  templateUrl: './vehicle-edition.component.html',
  styleUrls: ['./vehicle-edition.component.css']
})
export class VehicleEditionComponent implements OnInit {
  Columns = ['LicensePlate', 'Brand', 'Type', 'Power', 'Fuel', 'Odometer', 'Color', 'PurchasePrice', 'Date', 'Observation'];
  displayedColumns = this.Columns.concat(['actions']);

  dataSource: Vehicle[] = [];
  showForm: boolean = false;
  showEditForm: boolean = false;
  data: any = {}; // Object to hold form data


  selectedRow: Vehicle = { 
    LicensePlate: '',
    Brand: '',
    Type: '',
    Power: '',
    Fuel: '',
    Odometer: 0,
    Color: '',
    PurchasePrice: 0,
    Date: '', // Assuming date is represented as a string in ISO 8601 format
    Observation: ''
  };
  

  cancelForm() {
    this.showEditForm = false; 
    this.resetForm(); // Optionally reset the form fields
  }
  canceladdForm() {
    this.showForm = false; 
    this.resetForm(); // Optionally reset the form fields
  }
  
  constructor(private VehiclesEditionService: VehiclesEditionService) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.VehiclesEditionService.getCars().subscribe((data: any) => {
      this.dataSource = data.vehicles;
      console.log(this.dataSource)
    });
  }
  toggleForm() {
    this.showForm = !this.showForm;
  }

  editRow(element: Vehicle) {
    this.showEditForm = true; // Show the edit form
    this.selectedRow = { ...element }; // Copy the selected row's data
  }

  saveChanges() {
    // Here you can save the changes to the backend
    this.VehiclesEditionService.updateCar(this.selectedRow.LicensePlate, this.selectedRow).subscribe(() => {
      console.log('Saved changes:', this.selectedRow);
      this.showEditForm = false; // Hide the edit form after saving changes
    });
    this.fetchData();
  }
  deleteRow(element: Vehicle) {
    // Call deleteM function from the service to delete the row
    this.VehiclesEditionService.deleteCar(element.LicensePlate).subscribe(() => {
      console.log('Deleted row:', element);
      // After successful deletion, you might want to refresh the data
      this.fetchData();
    });}



      submitVehicle() {
        
        // Call addLc from DataService passing selectedRow
        this.VehiclesEditionService.addCar(this.selectedRow)
          .subscribe(response => {
            // Handle response if needed
            console.log('New license category added successfully', response);
            // Optionally, you can reset the form after successful submission
            this.resetForm();
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

      // Generate table headers
      printContent += '<table>';
      printContent += '<tr>';
      printContent += '<th>License Plate</th>';
      printContent += '<th>Brand</th>';
      printContent += '<th>Type</th>';
      printContent += '<th>Power</th>';
      printContent += '<th>Fuel</th>';
      printContent += '<th>Odometer</th>';
      printContent += '<th>Color</th>';
      printContent += '<th>Purchase Price</th>';
      printContent += '<th>Date</th>';
      printContent += '<th>Observation</th>';
      printContent += '</tr>';

      // Generate table rows from dataSource
      this.dataSource.forEach(element => {
        printContent += '<tr>';
        printContent += '<td>' + element.LicensePlate + '</td>';
        printContent += '<td>' + element.Brand + '</td>';
        printContent += '<td>' + element.Type + '</td>';
        printContent += '<td>' + element.Power + '</td>';
        printContent += '<td>' + element.Fuel + '</td>';
        printContent += '<td>' + element.Odometer + '</td>';
        printContent += '<td>' + element.Color + '</td>';
        printContent += '<td>' + element.PurchasePrice + '</td>';
        printContent += '<td>' + element.Date + '</td>';
        printContent += '<td>' + element.Observation + '</td>';
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
export interface Vehicle {
  LicensePlate: string;
  Brand: string;
  Type: string;
  Power: string;
  Fuel: string;
  Odometer: number;
  Color: string;
  PurchasePrice: number;
  Date: string; // Assuming date is represented as a string in ISO 8601 format
  Observation: string;
}
