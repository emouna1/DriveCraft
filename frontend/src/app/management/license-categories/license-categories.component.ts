import { Component, ElementRef, ViewChild } from '@angular/core';
import { FoldersService } from '../../folders.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-license-categories',
  templateUrl: './license-categories.component.html',
  styleUrl: './license-categories.component.css'
})
export class LicenseCategoriesComponent {
  
  licenseCategories: licenseCategory[] = [];
  showForm: boolean = false;
  showEditForm: boolean = false;
  selectedCategory: licenseCategory | null = null;
  form: FormGroup;
  formFields: string[] = ['Rank', 'CategoryCode', 'Designation', 'CodeRegistrationFees', 'ConductRegistrationFees', 'CodeReviewPrice', 'DrivingTestPrice', 'PriceHourCode', 'PricePerHourDriven', 'CodeExamCancellationFee', 'DrivingTestCancellationFees'];

  columns: string[] = ['Rank', 'CategoryCode', 'Designation', 'CodeRegistrationFees', 'ConductRegistrationFees', 'CodeReviewPrice', 'DrivingTestPrice', 'PriceHourCode', 'PricePerHourDriven', 'CodeExamCancellationFee', 'DrivingTestCancellationFees'];
  displayedColumns = this.columns.concat(['actions']);

  @ViewChild('printContent') printContent!: ElementRef;

  constructor(private licenseCategoryService: FoldersService) {
    this.form = new FormGroup({});
    this.formFields.forEach(field => {
      this.form.addControl(field, new FormControl('', Validators.required));
    });
  }

  ngOnInit(): void {
    this.fetchLicenseCategories();
  }

  fetchLicenseCategories(): void {
    this.licenseCategoryService.getAllLc().subscribe(categories => {
      this.licenseCategories = categories
      console.log(this.licenseCategories)
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    this.showEditForm = false;
    if (!this.showForm) {
      this.resetForm();
    }
  }

  editCategory(category: licenseCategory): void {
    this.selectedCategory = category;
    this.showEditForm = true;
    this.showForm = false;
    this.form.patchValue(category);
  }

  submitForm(): void {
    if (this.form.valid) {
      const formData = this.form.value;
      this.licenseCategoryService.addLc(formData).subscribe(() => {
        this.fetchLicenseCategories();
        this.resetForm();
      });
    }
  }

  saveChanges(): void {
    if (this.form.valid && this.selectedCategory) {
      const formData = this.form.value;
      this.licenseCategoryService.editLcategory(this.selectedCategory.CategoryCode, formData).subscribe(() => {
        this.fetchLicenseCategories();
        this.resetForm();
      });
    }
  }

  deleteCategory(category: licenseCategory): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.licenseCategoryService.deleteLcategory(category.id).subscribe(() => {
        this.fetchLicenseCategories();
      });
    }
  }

  cancelForm(): void {
    this.showForm = false;
    this.showEditForm = false;
    this.resetForm();
  }

  resetForm(): void {
    this.selectedCategory = null;
    this.showForm = false;
    this.showEditForm = false;

  }

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
        this.columns.forEach(column => {
          printContent += '<th>' + column + '</th>';
        });
        printContent += '</tr>';

        // Generate table rows from licenseCategories
        this.licenseCategories.forEach(category => {
          printContent += '<tr>';
          this.columns.forEach(column => {
            printContent += '<td>' + category[column as keyof licenseCategory] + '</td>';
          });
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

export interface licenseCategory {
  id: string;
  Rank: number;
  CategoryCode: string;
  Designation: string;
  CodeRegistrationFees: number;
  ConductRegistrationFees: number;
  CodeReviewPrice: number;
  DrivingTestPrice: number;
  PriceHourCode: number;
  PricePerHourDriven: number;
  CodeExamCancellationFee: number;
  DrivingTestCancellationFees: number;
}
  