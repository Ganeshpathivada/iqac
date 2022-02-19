import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUpdateStaffDailogComponent } from './add-update-dailog/add-update-staff-dailog/add-update-staff-dailog.component';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StaffListComponent } from './staff-list/staff-list.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'staff', component: StaffListComponent},
  { path: 'addStaff', component: AddUpdateStaffDailogComponent},
  { path: 'dashboard', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
