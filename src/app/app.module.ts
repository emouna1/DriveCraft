import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { VehiclesModule } from './vehicles/vehicles.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { EmployeeModule } from './employee/employee.module';
import { HttpClientModule } from '@angular/common/http';
import { NavigationComponent } from './navigation/navigation.component';
import { MaterialModule } from './material/material.module';
@NgModule({
  declarations: [
    AppComponent,
    
  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    VehiclesModule,
    EmployeeModule,
    HttpClientModule,
    NavigationComponent,
    MaterialModule
    
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
