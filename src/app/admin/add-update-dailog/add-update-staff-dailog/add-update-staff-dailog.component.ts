import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  constructor(private fb:FormBuilder, private http:HttpClient, private router:Router) {
    this.registerStaff = this.fb.group({
      id:[null],
      fullName : [""],
      dpmt : [""],
      qualification : [""],
      phone : [""],
      emailId : [""],
      gender : [""]
    })
  }

  

  ngOnInit(): void {
    const data = localStorage.getItem("staff")
    this.staffData = JSON.parse(data!)
    console.log("data", this.staffData)
    this.registerStaff.setValue(this.staffData)
  }

  onSubmit(){
    console.log("sss",this.registerStaff.value)
    
    if(this.staffData){
      this.http.put(this.url + this.staffData.id, this.registerStaff.value).subscribe(res=>{
        console.log("update", res)
        localStorage.removeItem('staff')
        this.router.navigateByUrl('/admin/staff')
      })
    }else{
      this.http.post(this.url, this.registerStaff.value).subscribe(res=>{
        this.router.navigateByUrl('/admin/staff')
      })
    }
  }
  
  ngOnDestroy(): void {
    localStorage.removeItem('staff')
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
  }
}
