import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app.component';
import { VehiclesModule } from './vehicles/vehicles.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { EmployeeModule } from './employee/employee.module';
import { NavigationComponent } from './navigation/navigation.component';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { AuthService } from './auth-service.service';
import { CarInterceptor } from './car.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule,
    VehiclesModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule 

    
  ],
  providers: [
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CarInterceptor,
      multi: true
    },
    //provideHttpClient(withInterceptors([CarInterceptor])),

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
