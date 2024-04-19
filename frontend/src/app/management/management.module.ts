import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { VehicleEditionComponent } from './vehicle-edition/vehicle-edition.component';
import { CondidateEditionComponent } from './condidate-edition/condidate-edition.component';
import { MaintenanceEditionComponent } from './maintenance-edition/maintenance-edition.component';
import { LicenseCategoriesComponent } from './license-categories/license-categories.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { PersonnelEditionComponent } from './personnel-edition/personnel-edition.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EnrollmentsComponent } from './enrollments/enrollments.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // include this line
import { AdminsComponent } from './admins/admins.component';
import { PaymentComponent } from './payment/payment.component';
import { ScheduleeComponent } from './schedulee/schedulee.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ScheduleComponent } from './schedule/schedule.component';
import { CarDialogComponent } from "./car-dialog/car-dialog.component";
import { ConductEnrollmentComponent } from './conduct-enrollment/conduct-enrollment.component';
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
       {path: 'Schedule' ,component: ScheduleComponent},
       {path:'Admins', component: AdminsComponent},
       {path:'Payment',component:PaymentComponent},
       {path:'conductEnrollments',component:ConductEnrollmentComponent},
       {path:'schedulee',component:ScheduleeComponent}

    ]
  }
];


@NgModule({
    declarations: [
        HomeComponent,
        VehicleEditionComponent,
        CondidateEditionComponent,
        MaintenanceEditionComponent,
        LicenseCategoriesComponent,
        PaymentMethodComponent,
        PersonnelEditionComponent,
        UserProfileComponent,
        EnrollmentsComponent,
        ScheduleeComponent,
        AdminsComponent,
        PaymentComponent,
        ScheduleComponent,
        CarDialogComponent,
        ConductEnrollmentComponent
    ],
    exports: [
        RouterModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        CalendarModule
    ],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        FullCalendarModule, // include FullCalendar module here
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
        }),
    ]
})
export class ManagementModule { }
