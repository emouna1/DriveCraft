import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateProfileComponent } from './candidate-profile/candidate-profile.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { LessonsScheduleComponent } from './lessons-schedule/lessons-schedule.component';
import { StudentDialogComponent } from './student-dialog/student-dialog.component';
import { ExamsScheduleComponent } from './exams-schedule/exams-schedule.component';
import { PaymentComponent } from './payment/payment.component';
const routes: Routes = [
   {
    path: 'home', 
    component: HomePageComponent,
    children: [
      { path: 'Profile', component: CandidateProfileComponent },
      { path: 'viewLessons', component: LessonsScheduleComponent },
      {path: 'viewExams' ,component:ExamsScheduleComponent },
      {path:'payments' ,component:PaymentComponent}
    ],}]
@NgModule({
  declarations: [
    CandidateProfileComponent,
    HomePageComponent,
    LessonsScheduleComponent,
    StudentDialogComponent,
    ExamsScheduleComponent,
    PaymentComponent
  ],exports: [
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
],
imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule, // include FullCalendar module here
  
]
  
})
export class CandidateModule { }
