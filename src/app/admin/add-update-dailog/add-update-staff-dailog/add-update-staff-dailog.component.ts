import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-update-staff-dailog',
  templateUrl: './add-update-staff-dailog.component.html',
  styleUrls: ['./add-update-staff-dailog.component.scss']
})
export class AddUpdateStaffDailogComponent implements OnInit {

  registerStaff : FormGroup;
  address:any;
  url = "http://localhost:8080/api/v1/staff/"
  staffData: any;
  selectedFaculity: any;

  constructor(private fb:FormBuilder, private http:HttpClient, private router:Router, private dialogRef: MatDialogRef<AddUpdateStaffDailogComponent>,
    @Inject(MAT_DIALOG_DATA) data:any) {
    this.selectedFaculity = data;
    this.registerStaff = this.fb.group({
      id:[0],
      fullName : [""],
      dpmt : [""],
      dob : [""],
      gender : [""],
      category : [""],
      qualification : [""],
      presentPosition : [""],
      doj : [""],
      teachingExp : [""],
      industrialExp : [""],
      panNumber : [""],
      aadharNumber :[""],
      phone : [""],
      emailId : [""],
      awards : [""],
      noOfPhd : [""],
      booksAuthored : [""],
      noOfResearchPapers : [""],
      totalNoOfResearch :[""],
      patents : [""],
      sno:[null],
      empNo:[null]
    })
    
  }

  

  ngOnInit(): void {
    console.log("selected", this.selectedFaculity)
    if(this.selectedFaculity.action === "update"){
      console.log("cons", this.selectedFaculity)
      this.registerStaff.setValue(this.selectedFaculity?.data)
    }
    
  }

  onSubmit(){
    console.log("sss",this.registerStaff.value)
    
    if(this.selectedFaculity?.action === "update"){
      this.http.put(this.url + this.selectedFaculity?.data.id, this.registerStaff.value).subscribe(res=>{
        console.log("update", res)
        alert("Faculity Has Been Updated successfully")
        this.dialogRef.close()
      })
    }else{
      this.http.post(this.url, this.registerStaff.value).subscribe(res=>{
        // this.router.navigateByUrl('/admin/staff')
        alert("Faculity Has Been Created successfully")
        this.dialogRef.close()
      })
    }
  }

  onClose(){
    this.dialogRef.close()
  }
  
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
  }
}
