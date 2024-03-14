import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [EmployeeDetailsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatFormFieldModule,FormsModule
  ]
})
export class EmployeeModule { }
