
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PaymentService } from '../../payment.service';
import { FoldersService } from 'src/app/folders.service';
interface Payment {
  id: number;
  date: string;
  montant: string;
  createdAt: string;
  updatedAt: string;
  candidatCIN: number | null;
  paymentDetails: PaymentDetail[];
  [key: string]: any; // Index signature allowing dynamic property access

}

interface PaymentDetail {
  id: number;
  montant: number;
  dateEcheance: string;
  createdAt: string;
  updatedAt: string;
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
      candidatCIN: null,
      paymentDetails: []
    };
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
  
    paymentColumns = ['id', 'date', 'montant', 'createdAt', 'updatedAt','candidatCIN'];
    displayedColumns = [...this.paymentColumns, 'actions'];
    paymentMethods: any[]=[];
     amountControl = new FormControl();
     pageSize: number = 3; // Number of payments per page

    constructor(private formBuilder: FormBuilder, private paymentService: PaymentService,private foldersService: FoldersService) { }
  
    ngOnInit(): void {
      this.createForm();
      this.fetchData();
      this.fetchPaymentMethods(); // Fetch payment methods when component initializes

    }
    fetchPaymentMethods(): void {
      // Call payment service to fetch payment methods and assign them to paymentMethods array
        this.foldersService.getAllPaymentMethods().subscribe((methods:any[]) => {

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
        candidatCIN: [this.selectedRow.candidatCIN],
        /*paymentDetails: this.formBuilder.array(
          this.selectedRow.paymentDetails.map(detail => this.addPaymentDetail(detail))
        )*/
        paymentDetails: this.formBuilder.array([]),

        // Add existing payment details to the form
            
      });
      // Add existing payment details to the form
       this.selectedRow.paymentDetails.forEach(detail => {
       this.addPaymentDetail(detail);
       });
    }
    
    /*addPaymentDetail(detail: PaymentDetail): FormGroup {
      return this.formBuilder.group({
        id: [detail.id],
        montant: [detail.montant],
        dateEcheance: [detail.dateEcheance],
        createdAt: [detail.createdAt],
        updatedAt: [detail.updatedAt],
        PaymentMethodId: [detail.PaymentMethodId],
        paymentId: [detail.paymentId]
      });
    }*/
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
        console.log(data)
      });
    }
  
    onPageChange(event: PageEvent): void {
      this.dataSource.paginator!.pageIndex = event.pageIndex;
      this.dataSource.paginator!.pageSize = event.pageSize;
    }
  
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
    
  
  
    saveChanges(): void {
      this.paymentService.editPayment(this.selectedRow.id,this.selectedRow).subscribe(() => {
        console.log('Saved changes:', this.selectedRow);
        this.showEditForm = false;
        this.fetchData();
      });
    }
  
    deleteRow(element: Payment): void {
      this.paymentService.deletePayment(element.id).subscribe(() => {
        console.log('Deleted row:', element);
        this.fetchData();
      });
    }
  
    submitPayment(): void {
      this.paymentService.addPayment(this.selectedRow).subscribe(response => {
        console.log('New Payment added successfully', response);
        this.resetForm();
      }, error => {
        console.error('Error adding Payment', error);
      });
    }

    /*getPaymentDetailsControls() {
      const paymentDetailsArray = this.paymentForm.get('paymentDetails') as FormArray;
      return paymentDetailsArray ? paymentDetailsArray.controls : [];
    }*/
    
   
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
    
    

  }
  
