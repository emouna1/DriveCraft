import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';

@NgModule({
  declarations: [
    VehicleDetailsComponent,
    VehicleFormComponent,
    VehicleListComponent
  ],
  exports: [
  VehicleListComponent,
  VehicleFormComponent,
  VehicleDetailsComponent],
  imports: [
    CommonModule
  ]
})
export class VehiclesModule { }
