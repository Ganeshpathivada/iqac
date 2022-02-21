import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { StaffListComponent } from './staff-list/staff-list.component';
import { AddUpdateStaffDailogComponent } from './add-update-dailog/add-update-staff-dailog/add-update-staff-dailog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from '../shared/material/material.module';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { FilterPipe } from '../shared/pipes/filter.pipe';


@NgModule({
  declarations: [
    AdminComponent,
    StaffListComponent,
    AddUpdateStaffDailogComponent,
    DashboardComponent,
    FilterPipe
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
})
export class AdminModule { }
