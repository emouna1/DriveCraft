import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { VehiclesEditionService } from 'src/app/vehicles-edition.service';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-vehicle-edition',
  templateUrl: './vehicle-edition.component.html',
  styleUrls: ['./vehicle-edition.component.css']
})
export class VehicleEditionComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<Vehicle>();
  columns = ['LicensePlate', 'Brand', 'Type', 'Power', 'Fuel', 'Odometer', 'Color', 'PurchasePrice', 'Date', 'Observation', 'Image'];
  displayedColumns = [...this.columns, 'actions'];

  addVehicleForm!: FormGroup;
  editVehicleForm!: FormGroup;
  backendUrl = 'http://localhost:3000'; // Replace with your backend URL

  showForm: boolean = false; // Added variable to control the visibility of the add form
  showEditForm: boolean = false; // Added variable to control the visibility of the edit form
  fileToUpload: File | null = null;

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
    Observation: '',
    Image: ''
  };

  constructor(
    private vehiclesEditionService: VehiclesEditionService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar // Inject MatSnackBar

  ) { }

  ngOnInit() {
    this.createForms();
    this.fetchData();
  }

  createForms() {
    this.addVehicleForm = this.fb.group({
      LicensePlate: ['', Validators.required],
      Brand: ['', Validators.required],
      Type: ['', Validators.required],
      Power: ['', Validators.required],
      Fuel: ['', Validators.required],
      Odometer: [0, Validators.required],
      Color: ['', Validators.required],
      PurchasePrice: [0, Validators.required],
      Date: ['', Validators.required],
      Observation: ['', Validators.required],
      Image: [null]
    });

    this.editVehicleForm = this.fb.group({
      LicensePlate: ['', Validators.required],
      Brand: ['', Validators.required],
      Type: ['', Validators.required],
      Power: ['', Validators.required],
      Fuel: ['', Validators.required],
      Odometer: [0, Validators.required],
      Color: ['', Validators.required],
      PurchasePrice: [0, Validators.required],
      Date: ['', Validators.required],
      Observation: ['', Validators.required],
      Image:[null]
    });
  }

  fetchData() {
    this.vehiclesEditionService.getCars().subscribe((data: any) => {
      this.dataSource.data = data.vehicles;
      this.dataSource.paginator = this.paginator;
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
    this.showEditForm = false; // Ensure edit form is not shown when toggling edit form
    this.addVehicleForm.reset();
  }

  editRow(element: Vehicle) {
    this.editVehicleForm.patchValue(element);
    this.showEditForm = true;
    this.showForm = false; // Ensure add form is not shown when opening edit form
  }

  /*saveChanges() {
    if (this.editVehicleForm.valid) {
      const formData = this.editVehicleForm.value;
      this.vehiclesEditionService.updateCar(formData.LicensePlate, formData).subscribe(
        response => {
          console.log('Vehicle updated successfully', response);
          this.editVehicleForm.reset();
          this.fetchData();
          this.showEditForm = false; // Hide edit form after saving changes
        },
        error => {
          console.error('Error updating vehicle', error);
        }
      );
    }
  }

  deleteRow(element: Vehicle) {
    this.vehiclesEditionService.deleteCar(element.LicensePlate).subscribe(() => {
      console.log('Deleted row:', element);
      this.fetchData();
    });
  }

  submitVehicle() {
    if (this.addVehicleForm.valid) {
      this.vehiclesEditionService.addCar(this.addVehicleForm.value).subscribe(
        response => {
          console.log('Vehicle added successfully', response);
          this.addVehicleForm.reset();
          this.fetchData();
          this.showForm = false; // Hide add form after submitting
        },
        error => {
          console.error('Error adding vehicle', error);
        }
      );
    }
  }*/
  onFileChange(event: any) {
    this.fileToUpload = event.target.files[0];
  }

  saveChanges() {
    if (this.editVehicleForm.valid) {
      const formData: FormData = new FormData();
      const formValues = this.editVehicleForm.value;

      for (const key in formValues) {
        formData.append(key, formValues[key]);
      }

      if (this.fileToUpload) {
        formData.append('image', this.fileToUpload, this.fileToUpload.name);
      }

      this.vehiclesEditionService.updateCar(formValues.LicensePlate, formData).subscribe(
        response => {
          console.log('Vehicle updated successfully', response);
          this.snackBar.open('Vehicle updated successfully', 'Close', {
            duration: 3000
          });
          this.editVehicleForm.reset();
          this.fetchData();
          this.showEditForm = false;
        },
        error => {
          console.error('Error updating vehicle', error);
          this.snackBar.open('Error updating vehicle', 'Close', {
            duration: 3000
          }); 
        }
      );
    }
  }

  deleteRow(element: Vehicle) {
    this.vehiclesEditionService.deleteCar(element.LicensePlate).subscribe(
      () => {
        console.log('Deleted row:', element);
        this.snackBar.open('Vehicle deleted successfully', 'Close', {
          duration: 3000
        }); // Success notification
        this.fetchData();
      },
      error => {
        console.error('Error deleting vehicle', error);
        this.snackBar.open('Error deleting vehicle', 'Close', {
          duration: 3000
        }); // Error notification
      }
    );
  }

  submitVehicle() {
    if (this.addVehicleForm.valid) {
      const formData: FormData = new FormData();
      const formValues = this.addVehicleForm.value;

      for (const key in formValues) {
        formData.append(key, formValues[key]);
      }

      if (this.fileToUpload) {
        formData.append('image', this.fileToUpload, this.fileToUpload.name);
      }

      this.vehiclesEditionService.addCar(formData).subscribe(
        response => {
          console.log('Vehicle added successfully', response);
          this.snackBar.open('Vehicle added successfully', 'Close', {
            duration: 3000
          });
          this.addVehicleForm.reset();
          this.fetchData();
          this.showForm = false;
        },
        error => {
          console.error('Error adding vehicle', error);
          this.snackBar.open('Error adding vehicle', 'Close', {
            duration: 3000
          });
        }
      );
    }
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
      printContent += '<th>Image</th>';
      printContent += '</tr>';

      // Generate table rows from dataSource
      this.dataSource.data.forEach(element => {
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
        //printContent += '<td><img src="' + element.Image + '" alt="Vehicle Image" width="100"></td>';
        printContent += '<td><img src="' + this.getAbsoluteUrl(element.Image) + '" alt="Vehicle Image" width="100"></td>';

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
  
  
cancelForm() {
  this.showEditForm = false; 
  this.fetchData();
}
canceladdForm() {
  this.showForm = false; 
  this.fetchData();
}
 //pagination 
 onPageChange(event: PageEvent) {
  this.dataSource.paginator!.pageIndex = event.pageIndex;
  this.dataSource.paginator!.pageSize = event.pageSize;
}
  
getAbsoluteUrl(relativePath: string): string {
  if (!relativePath) {
    return '';
  }
  // Replace backslashes with forward slashes and prepend the backend URL
  return this.backendUrl + relativePath.replace(/\\/g, '/');
  //return this.backendUrl + relativePath

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
  Image: string;
}
