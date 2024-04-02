import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material/material.module';

/*const routes:Routes=[
  {path:'vehicle',component:VehicleEditionComponent,
  },
  

]*/
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
   // RouterModule.forChild(routes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule

  ],
  exports:[
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FoldersModule { }
