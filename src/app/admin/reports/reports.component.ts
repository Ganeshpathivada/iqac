import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddUpdateReportsDailogComponent } from '../add-update-dailog/add-update-reports-dailog/add-update-reports-dailog.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  url = "http://localhost:8080/api/v1/downloadFile/";
  searchData:any;
  reportsDetails:any;
  // = [
  //   {Reports:1, year:2012, type:"india today"},
  //   {Reports:2, year:2013, type:"nirf"},
  //   {Reports:3, year:2013, type:"the week hansa"},
  //   {Reports:4, year:2013, type:"atal Reportsing"},
  //   {Reports:5, year:2014, type:"qs"},
  //   {Reports:5, year:2015, type:"tle"},
  //   {Reports:5, year:2016, type:"nirf"},
  //   {Reports:5, year:2017, type:"nirf"},
  // ];
  searchByType:any ="nirf";
  pageIndex = 1;
  action: any;
  selectedReports: any;

  constructor(private dialog: MatDialog, private http:HttpClient) { }

  ngOnInit(): void {
    this.getReports()
  }

  getReports(){
    this.http.get(this.url).subscribe(res=>{
      this.reportsDetails = res
    })
  }

  addReports(){
    this.action="add";
    this.addUpdateReports();
  }
  viewReports(Reports:any){
    this.selectedReports = Reports;
    this.action="update";
    this.addUpdateReports();
  }

  addUpdateReports(){
const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    (dialogConfig.width = "450px"),
      (dialogConfig.data = {
        action: this.action,
        data: this.selectedReports,
      });
    const dialogRef = this.dialog.open(
      AddUpdateReportsDailogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((data) => {
      console.log("Dialog output:", data);
      this.getReports()
      // if (data.action === "add") {
      //   if (data.data != null) {
      //   }
      // } else {
      // }
    });
  }

  deleteReports(Reports:any){
    this.http.delete(this.url + Reports.id).subscribe(res=>{
      // this.reportsDetails = res
      this.getReports()
    })
  }

  onChange(type:any){
    this.searchByType = type;
  }

}
