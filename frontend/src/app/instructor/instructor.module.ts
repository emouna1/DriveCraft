import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { InstructorProfileComponent } from './instructor-profile/instructor-profile.component';
import { ManageLessonsComponent } from './manage-lessons/manage-lessons.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ManageStudentsComponent } from './manage-students/manage-students.component';
const routes: Routes = [
  {
   path: 'home', 
   component: HomePageComponent,
   children: [
     { path: 'Profile', component: InstructorProfileComponent },
     { path: 'Lessons', component:ManageLessonsComponent },
      {path: 'viewExams' ,component:ScheduleComponent },
      {path:'manage' ,component:ManageStudentsComponent}

   ],}]
@NgModule({
  declarations: [
    HomePageComponent,
    InstructorProfileComponent,
    ManageLessonsComponent,
    ScheduleComponent,
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
export class InstructorModule { }
