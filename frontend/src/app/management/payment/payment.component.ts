
import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PaymentService } from '../../payment.service';
import { FoldersService } from 'src/app/folders.service';
import { MatSnackBar } from '@angular/material/snack-bar';
interface Payment {
  date: string;
  montant: string;
  
  candidatCIN: number | null;
  paymentDetails: PaymentDetail[];
  isSuccessful: boolean;
  [key: string]: any; // Index signature allowing dynamic property access

}

interface PaymentDetail {
  montant: number;
  dateEcheance: string;
  createdAt: string;
  updatedAt: string;
  PaymentMethodId: number | null;
  paymentId: number;
  verificationUrl : string;
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent  {

  
  
  
    paymentForm!: FormGroup;
    dataSource = new MatTableDataSource<Payment>();
    showForm: boolean = false;
    showEditForm: boolean = false;
    selectedRow: Payment = {
      //id: 0,
      date: '',
      montant: '',
      createdAt: '',
      updatedAt: '',
      candidatCIN: null,
      paymentDetails: [],
      isSuccessful: true
    };
    pageSize: number = 2; 

    @ViewChild(MatPaginator) paginator!: MatPaginator;
  
    paymentColumns = ['date', 'montant', 'createdAt', 'updatedAt','candidatCIN'];
    displayedColumns = [...this.paymentColumns, 'actions'];
    paymentMethods: any[]=[];
    amountControl = new FormControl();

    constructor(private formBuilder: FormBuilder,
      private paymentService: PaymentService,
      private foldersService: FoldersService,
      private snackBar: MatSnackBar) 
      { }
   
    ngOnInit(): void {
      this.createForm();
      this.fetchData();
      this.fetchPaymentMethods(); 
    }

    fetchPaymentMethods(): void {
        this.foldersService.getAllPaymentMethods().subscribe((methods:any[]) => {
        this.paymentMethods = methods;
      });
    }

    createForm(): void {
      this.paymentForm = this.formBuilder.group({
        date: [this.selectedRow.date, Validators.required],
        montant: [this.selectedRow.montant, Validators.required],
      
        candidatCIN: [this.selectedRow.candidatCIN],
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
    
    fetchData(): void {
      this.paymentService.getAllPayments().subscribe((data: Payment[]) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator; // Set the paginator here
        console.log(data)
      });
    }
  
    onPageChange(event: PageEvent): void {
      if (this.dataSource.paginator) {
        this.dataSource.paginator.pageIndex = event.pageIndex;
        this.dataSource.paginator.pageSize = event.pageSize;
      }}
  
    toggleForm(): void {
      this.showForm = !this.showForm;
    }
  
  
    editRow(element: Payment): void {
      this.showEditForm = true;
      this.selectedRow = { ...element };
      this.createForm(); // Reinitialize form with selected payment data
    
      // Pre-fill form fields with selected payment data
      this.paymentForm.patchValue({
        date: this.selectedRow.date,
        montant: this.selectedRow.montant,
      });
    
      // Clear existing payment details from the form
      const paymentDetailsArray = this.paymentForm.get('paymentDetails') as FormArray;
      paymentDetailsArray.clear();
    
      // Add existing payment details to the form
      this.selectedRow.paymentDetails.forEach(detail => {
        this.addPaymentDetail(detail);
      });
    }
    
    deleteRow(element: Payment): void {
      this.paymentService.deletePayment(element['id']).subscribe(() => {
        console.log('Deleted row:', element);
        this.fetchData();
      });
    }
  
    getControls() {
      const controls = (this.paymentForm.get('paymentDetails') as FormArray).controls;
      console.log(controls);
      return controls;
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
      //this.paymentForm.setControl('paymentDetails', this.formBuilder.array([]));

      // Clear the paymentDetails form array
      const paymentDetailsArray = this.paymentForm.get('paymentDetails') as FormArray;
      paymentDetailsArray.clear();
    
      // Reinitialize the form with the default selectedRow values
      this.createForm();
    }
    
    markAsSuccessful(payment : Payment) {
      this.paymentService.markPaymentAsSuccessful(payment['id']).subscribe(() => {
        this.fetchData();
      });
    }
    constructVerificationImg(url: string): string {
      const constructedUrl = 'http://localhost:3000/' + url.replace(/\\/g, '/');
     //console.log('Constructed URL:', constructedUrl);
      return constructedUrl;
    }
    // Add this method in your component
   getPaymentClass(payment: Payment): string {
  return payment.isSuccessful ? 'payment-successful' : 'payment-unsuccessful';
   }

   submitPayment(): void {
    if (this.paymentForm.valid) {
      const paymentData = this.paymentForm.value;
       console.log("payment Data before stringify is ",paymentData)
      // Stringify paymentDetails to ensure it's sent as JSON string
      paymentData.paymentDetails = JSON.stringify(paymentData.paymentDetails);
      console.log("payment data after stringify is ", paymentData)
      this.paymentService.addPayment(paymentData).subscribe(
        response => {
          console.log('New Payment added successfully', response);
          this.fetchData(); // Refresh the data after adding
          this.resetForm(); // Reset the form
        },
        error => {
          console.error('Error adding Payment', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
  
  get paymentDetails(): FormArray {
  return this.paymentForm.get('paymentDetails') as FormArray;
}

  // For editing the payment, ensure you're updating the selectedRow from the form
  saveChanges(): void {
    if (this.paymentForm.valid) {
      const updatedPayment = this.paymentForm.value; // Get updated form values
      this.paymentService.editPayment(this.selectedRow['id'], updatedPayment).subscribe(() => {
        console.log('Saved changes:', updatedPayment);
        this.showEditForm = false;
        this.fetchData(); // Refresh the data after editing
      });
    } else {
      console.log('Form is invalid');
    }
  }
  // Use this method to open a snack bar
openSnackBar(message: string, action: string) {
  this.snackBar.open(message, action, {
    duration: 2000,
  });
}


  }
  
