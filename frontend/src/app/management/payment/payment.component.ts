
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PaymentService } from '../../payment.service';
interface Payment {
  id: number;
  date: string;
  montant: string;
  createdAt: string;
  updatedAt: string;
  StudentId: number | null;
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
      StudentId: null,
      paymentDetails: []
    };
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
  
    paymentColumns = ['id', 'date', 'montant', 'createdAt', 'updatedAt', 'actions'];
    displayedColumns = [...this.paymentColumns, 'actions'];
  
    constructor(private formBuilder: FormBuilder, private paymentService: PaymentService) { }
  
    ngOnInit(): void {
      this.createForm();
      this.fetchData();
    }
  
    createForm(): void {
      this.paymentForm = this.formBuilder.group({
        id: [this.selectedRow.id, Validators.required],
        date: [this.selectedRow.date, Validators.required],
        montant: [this.selectedRow.montant, Validators.required],
        createdAt: [this.selectedRow.createdAt, Validators.required],
        updatedAt: [this.selectedRow.updatedAt, Validators.required],
        StudentId: [this.selectedRow.StudentId],
        paymentDetails: this.formBuilder.array(
          this.selectedRow.paymentDetails.map(detail => this.createPaymentDetailFormGroup(detail))
        )
      });
    }
    
    createPaymentDetailFormGroup(detail: PaymentDetail): FormGroup {
      return this.formBuilder.group({
        id: [detail.id],
        montant: [detail.montant],
        dateEcheance: [detail.dateEcheance],
        createdAt: [detail.createdAt],
        updatedAt: [detail.updatedAt],
        PaymentMethodId: [detail.PaymentMethodId],
        paymentId: [detail.paymentId]
      });
    }
    
  
    fetchData(): void {
      this.paymentService.getAllPayments().subscribe((data: Payment[]) => {
        this.dataSource.data = data;
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
    }
  
    resetForm(): void {
      window.location.reload();
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
  }
  
