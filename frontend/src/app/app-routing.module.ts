import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { authGuard } from './auth.guard';
import { candidateAuthGuard } from './candidate-auth.guard';
import { instructorAuthGuard } from './instructor-auth.guard';
import { UserEnrollmentComponent } from './user-enrollment/user-enrollment.component';
const routes: Routes = [
  { path: '', component: AppComponent }, // Redirect empty path to AppComponent
  {path: 'auth' , loadChildren:()=>import('./authentication/authentication.module').then((m)=> m.AuthenticationModule)},
  {path: 'manage' ,canActivate: [authGuard],
  loadChildren:()=>import('./management/management.module').then((m)=> m.ManagementModule) },
  {path: 'candidate' , canActivate: [candidateAuthGuard],
  loadChildren:()=>import('./candidate/candidate.module').then((m)=> m.CandidateModule)},
  {path: 'instructor' , canActivate: [instructorAuthGuard],
  loadChildren:()=>import('./instructor/instructor.module').then((m)=> m.InstructorModule)},
  { path: 'enroll', component: UserEnrollmentComponent } // Define the route


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
