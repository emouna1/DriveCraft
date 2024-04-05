import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../app.component';
import { VehicleEditionComponent } from './vehicle-edition/vehicle-edition.component';
import { MatDialog } from '@angular/material/dialog';
import { EditCandidateDialogComponent } from './edit-candidate-dialog/edit-candidate-dialog.component';
import { CondidateEditionComponent } from './condidate-edition/condidate-edition.component';
import { MaintenanceEditionComponent } from './maintenance-edition/maintenance-edition.component';
import { LicenseCategoriesComponent } from './license-categories/license-categories.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { PersonnelEditionComponent } from './personnel-edition/personnel-edition.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EnrollmentsComponent } from './enrollments/enrollments.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // include this line
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
const routes: Routes = [
  { 
    path: 'dash', 
    component: HomeComponent,
    children: [
      //{ path: '', component: HomeComponent },
      { path: 'vehicles', component: VehicleEditionComponent },
      { path: 'Candidat', component: CondidateEditionComponent},
      { path: 'Maintenance', component: MaintenanceEditionComponent},
       {path: 'license' , component: LicenseCategoriesComponent},
       {path: 'paymentMethod' , component: PaymentMethodComponent},
       {path: 'personalEdition' , component: PersonnelEditionComponent},
       {path: 'userProfile' , component: UserProfileComponent},
       {path: 'Enrollments' ,component: EnrollmentsComponent},
       {path: 'Schedule' ,component: ScheduleComponent}
    ]
  }
];


@NgModule({
  declarations: [
    HomeComponent,
    VehicleEditionComponent,
    EditCandidateDialogComponent,
    CondidateEditionComponent,
    MaintenanceEditionComponent,
    LicenseCategoriesComponent,
    PaymentMethodComponent,
    PersonnelEditionComponent,
    UserProfileComponent,
    EnrollmentsComponent,
    ScheduleComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule // include FullCalendar module here

    
    
  ],
  exports: [
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    
    
  ]
})
export class ManagementModule { }
