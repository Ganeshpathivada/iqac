import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  url = "http://localhost:8080/api/v1/staff/"
  faculity :any;

  constructor(private http: HttpClient) { }

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
}
