import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddUpdateStaffDailogComponent } from '../add-update-dailog/add-update-staff-dailog/add-update-staff-dailog.component';
import { IqacServiceService } from 'src/app/services/iqac-service.service';
 
@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss']
})
export class StaffListComponent implements OnInit {
  faculity :any;
  searchData:any;
  action: any;
  selectedFaculity: any;
  searchDpmt:any=null;

  p:number = 1;
  public itemsPerPage: number = 10;

  

  constructor(private http: HttpClient, private router: Router, private dialog: MatDialog,
    private iqacService: IqacServiceService) {
  }


  ngOnInit(): void {
    this.getfaculiy()
  }

  getfaculiy(){
    this.iqacService.getFaculty().subscribe(res=>{
      console.log("data",res)
      this.faculity = res
      this.p = 1
    })
  }

  deleteFaculiy(faculiy:any){
    console.log(faculiy)
    let text = "Are you sure?\nYou won't be able to revert this!."
    if (confirm(text) == true) {
      this.iqacService.deleteFaculty(faculiy.id).subscribe(res =>{
        console.log("data",res)
        alert("Faculity Has Been Deleted Successfully")
        this.searchData = null
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
    this.iqacService.faculityData = {action: this.action, data: this.selectedFaculity}
    this.router.navigateByUrl('/admin/addStaff')
    // const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    // (dialogConfig.width = "1080px"),
    //   (dialogConfig.data = {
    //     action: this.action,
    //     data: this.selectedFaculity,
    //   });
    // const dialogRef = this.dialog.open(
    //   AddUpdateStaffDailogComponent,
    //   dialogConfig
    // );
    // dialogRef.afterClosed().subscribe((data) => {
    //   console.log("Dialog output:", data);
    //   this.getfaculiy()
    //   // if (data.action === "add") {
    //   //   if (data.data != null) {
    //   //   }
    //   // } else {
    //   // }
    // });
  }


  onChangeDpmt(event:any){
    console.log("event",event.target.value)
    if(event){
      this.searchData = null
    }
  }



}
