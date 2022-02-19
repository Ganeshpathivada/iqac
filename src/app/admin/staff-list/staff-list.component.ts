import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss']
})
export class StaffListComponent implements OnInit {

  url = "http://localhost:8080/api/v1/staff/"
  staffs :any;

  constructor(private http: HttpClient, private router: Router) {
    
    
   }

  ngOnInit(): void {
    this.getStaff()
  }

  getStaff(){
    this.http.get(this.url).subscribe(res =>{
      // const data = res
      console.log("data",res)
      this.staffs = res
    })
  }

  deleteStaff(staff:any){
    console.log(staff)
    this.http.delete(this.url + staff.id).subscribe(res =>{
      console.log("data",res)
      this.getStaff()
    })
  }

  editStaff(staff: any){
     this.router.navigateByUrl('/admin/addStaff');
     localStorage.setItem("staff", JSON.stringify(staff));
  }



}
