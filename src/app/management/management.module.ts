import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
    
  ],
  exports: [
    MaterialModule
  ]
})
export class ManagementModule { }
