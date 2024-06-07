import { AuthService } from 'src/app/auth-service.service';
import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PaymentService } from 'src/app/payment.service';
import { FoldersService } from 'src/app/folders.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Payment {
  id: number;
  date: string;
  montant: string;
  createdAt: string;
  updatedAt: string;
  candidatCIN: string;
  paymentDetails: PaymentDetail[];
  isSuccessful: boolean;
  [key: string]: any; // Index signature allowing dynamic property access

}

interface PaymentDetail {
  id: number;
  montant: number;
  dateEcheance: string;
  createdAt: string;
  updatedAt: string;
  verificationUrl:string;
  PaymentMethodId: number | null;
  paymentId: number;
}
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})


export class PaymentComponent {
  paymentForm!: FormGroup;
  dataSource = new MatTableDataSource<Payment>();
  showForm: boolean = false;
  showEditForm: boolean = false;
  selectedRow: Payment = {
    id: 0,
    date: '',
    montant: '',
    createdAt: '',
    updatedAt: '',
    candidatCIN: '',
    paymentDetails: [],
    isSuccessful: false
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  paymentColumns = ['id', 'date', 'montant', 'createdAt', 'updatedAt', 'actions'];
  displayedColumns = [...this.paymentColumns, 'actions'];
  paymentMethods: any[] = [];
  amountControl = new FormControl();
  pageSize: number = 3; // Number of payments per page
  selectedFile: File | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private paymentService: PaymentService,
    private foldersService: FoldersService,
    private authService: AuthService,
    private snackBar:MatSnackBar
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.fetchData();
    this.fetchPaymentMethods(); // Fetch payment methods when component initializes
  }

  fetchPaymentMethods(): void {
    // Call payment service to fetch payment methods and assign them to paymentMethods array
    this.foldersService.getAllPaymentMethods().subscribe((methods: any[]) => {
      this.paymentMethods = methods;
    });
  }

  createForm(): void {
    this.paymentForm = this.formBuilder.group({
      id: [this.selectedRow.id, Validators.required],
      date: [this.selectedRow.date, Validators.required],
      montant: [this.selectedRow.montant, Validators.required],
      createdAt: [this.selectedRow.createdAt, Validators.required],
      updatedAt: [this.selectedRow.updatedAt, Validators.required],
      candidatCIN: [this.selectedRow.candidatCIN, Validators.required],
      paymentDetails: this.formBuilder.array([]),
    });

    // Add existing payment details to the form
    this.selectedRow.paymentDetails.forEach(detail => {
      this.addPaymentDetail(detail);
    });
  }

  addPaymentDetail(detail?: PaymentDetail): void {
    const paymentDetailForm = this.formBuilder.group({
      montant: [(detail ? detail.montant : ''), Validators.required],
      dateEcheance: [(detail ? detail.dateEcheance : ''), Validators.required],

      paymentMethodId: [(detail ? detail.PaymentMethodId : ''), Validators.required]
    });
    (this.paymentForm.get('paymentDetails') as FormArray).push(paymentDetailForm);
  }

  onPageChange(event: PageEvent): void {
    this.dataSource.paginator!.pageIndex = event.pageIndex;
    this.dataSource.paginator!.pageSize = event.pageSize;
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  

  saveChanges(): void {
    this.paymentService.editPayment(this.selectedRow.id, this.selectedRow).subscribe(() => {
      console.log('Saved changes:', this.selectedRow);
      this.showEditForm = false;
      this.fetchData();
    });
  }

 

  /*submitPayment(): void {
    if (this.selectedFile) {
      // Create a FormData object to append the file
      const formData: FormData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

      // Add other form data (if any) to the FormData object
      formData.append('date', this.paymentForm.value.date);
      formData.append('montant', this.paymentForm.value.montant);

      // Call the payment service method to add payment with the FormData object
      this.paymentService.addPayment(formData).subscribe(
        response => {
          console.log('New Payment added successfully', response);
          this.resetForm();
        },
        error => {
          console.error('Error adding Payment', error);
        }
      );
    } else {
      console.error('No file selected.');
      // Handle the case where no file is selected
    }
  }*/
  submitPayment(): void {
    if (this.selectedFile) {
      const formData: FormData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
  
      formData.append('date', new Date(this.paymentForm.value.date).toISOString());
      formData.append('montant', this.paymentForm.value.montant.toString());
  
      const userCIN = this.authService.getCurrentUserCIN();
  
      if (userCIN) {
        formData.append('candidatCIN', userCIN);
      } else {
        console.error('User CIN not found.');
        return;
      }
  
      // Prepare paymentDetails as an array of objects
      const paymentDetails = this.paymentForm.value.paymentDetails.map((detail: any) => {
        const method = this.paymentMethods.find(m => m.designation === detail.paymentMethodId);
        if (!method) {
          throw new Error(`Payment method not found for designation: ${detail.paymentMethodId}`);
        }
        return {
          montant: detail.montant.toString(),
          dateEcheance: new Date(detail.dateEcheance).toISOString(),
          paymentMethodId: method.id.toString()
        };
      });
  
      // Log paymentDetails before sending
      console.log('Payment Details:', paymentDetails);
  
      // Stringify the paymentDetails array and append to formData
      formData.append('paymentDetails', JSON.stringify(paymentDetails));
  
      // Log form data entries for debugging
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
  
      // Call the payment service to send the data to the server
      this.paymentService.addPayment(formData).subscribe(
        response => {
          console.log('New Payment added successfully', response);
          this.showNotification('Payment Sent', 'An email will be received upon approval.');
          this.cancelForm();
          this.fetchData();
        },
        error => {
          console.error('Error adding Payment', error);
          this.showNotification('ERROR',' occured please verify that you entered the fields correctly :> ');
          if (error.error) {
            console.error('Detailed error:', error.error);
          }
        }
      );
    } else {
      console.error('No file selected.');
    }
  }
  
  
  

  getControls() {
    return (this.paymentForm.get('paymentDetails') as FormArray).controls;
  }

  cancelForm(): void {
    // Reset the form
    this.resetForm();

    // Hide the form
    this.showForm = false;
    this.showEditForm = false;
  }

  resetForm(): void {
    // Reset the form controls to their initial state
    this.paymentForm.reset();

    // Clear the paymentDetails form array
    const paymentDetailsArray = this.paymentForm.get('paymentDetails') as FormArray;
    paymentDetailsArray.clear();

    // Reinitialize the form with the default selectedRow values
    this.createForm();
  }

  fetchData(): void {
    const userCIN = this.authService.getCurrentUserCIN();
    if (userCIN) {
      this.paymentService.getAllPayments().subscribe(
        (data: Payment[]) => {
          console.log(data)
          const userPayments = data.filter(item => item['candidatCIN'] === userCIN && item['isSuccessful']);
          this.dataSource.data = userPayments;
          console.log(userPayments);
        },
        error => {
          console.error('Error fetching payments:', error);
          // Handle error gracefully, show error message, etc.
        }
      );
    } else {
      console.error('User CIN not found in local storage.');
    }
  }
  showNotification(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 5000, // Duration in milliseconds
    });}
  
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.selectedFile = file;
  }
}
