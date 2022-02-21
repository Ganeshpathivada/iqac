import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AddUpdateStaffDailogComponent } from '../add-update-dailog/add-update-staff-dailog/add-update-staff-dailog.component';
 
@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss']
})
export class StaffListComponent implements OnInit {

  url = "http://localhost:8080/api/v1/staff/"
  faculity :any;
  searchData:any;
  action: any;
  selectedFaculity: any;

  //pagination and api integration starts from here
  pageIndex = 1;
  // length = 100;
  // pageSize = 10;
  // pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  // pageEvent: PageEvent;
  // isDefault: boolean = true;

  constructor(private http: HttpClient, private router: Router, private dialog: MatDialog,) {
  }

  ngOnInit(): void {
    this.getfaculiy()
  }

  getfaculiy(){
    this.http.get(this.url).subscribe(res =>{
      // const data = res
      console.log("data",res)
      this.faculity = res
    })
  }

  deleteFaculiy(faculiy:any){
    console.log(faculiy)
    let text = "Are you sure?\nYou won't be able to revert this!."
    if (confirm(text) == true) {
      this.http.delete(this.url + faculiy.id).subscribe(res =>{
        console.log("data",res)
        alert("Faculity Has Been Deleted Successfully")
        this.getfaculiy()
      })
    } else {
    }
    
  }

  addFaculity(){
    this.action="add";
    this.addUpdateFaculity();
  }

  editFaculiy(faculiy: any){
    this.selectedFaculity = faculiy;
    this.action="update";
    this.addUpdateFaculity();
  }

  addFaculitybyExcel(){
    this.action="uploadExcel";
    this.addUpdateFaculity();
    
  }

  viewFaculiy(faculiy:any){
    this.selectedFaculity = faculiy;
    this.action="view";
    this.addUpdateFaculity();
    
  }


  public addUpdateFaculity(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    (dialogConfig.width = "1080px"),
      (dialogConfig.data = {
        action: this.action,
        data: this.selectedFaculity,
      });
    const dialogRef = this.dialog.open(
      AddUpdateStaffDailogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((data) => {
      console.log("Dialog output:", data);
      this.getfaculiy()
      // if (data.action === "add") {
      //   if (data.data != null) {
      //   }
      // } else {
      // }
    });
  }



}
