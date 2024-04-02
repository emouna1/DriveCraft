import { ManagementModule } from './management/management.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { authGuard } from './auth.guard';
const routes: Routes = [
  { path: '', component: AppComponent }, // Redirect empty path to AppComponent
  {path: 'auth' , loadChildren:()=>import('./authentication/authentication.module').then((m)=> m.AuthenticationModule)},
  {path: 'manage' ,     canActivate: [authGuard],
  loadChildren:()=>import('./management/management.module').then((m)=> m.ManagementModule) },
  {path: 'folders' , loadChildren:()=>import('./folders/folders.module').then((m)=> m.FoldersModule)},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
