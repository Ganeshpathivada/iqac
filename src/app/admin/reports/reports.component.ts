import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IqacServiceService } from 'src/app/services/iqac-service.service';
import { AddUpdateReportsDailogComponent } from '../add-update-dailog/add-update-reports-dailog/add-update-reports-dailog.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  searchData:any;
  reportsDetails:any;
  searchByType:any ="nirf";
  pageIndex = 1;
  action: any;
  selectedReports: any;
  p:number = 1;
  public itemsPerPage: number = 10;

  constructor(private dialog: MatDialog, private http:HttpClient, private iqacService: IqacServiceService) { }

  ngOnInit(): void {
    this.getReports()
  }

  getReports(){
    this.iqacService.getReport().subscribe(res=>{
      this.reportsDetails = res
      this.p = 1
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
    (dialogConfig.width = "1450px"),
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
    this.iqacService.deleteReport(Reports.id).subscribe(res=>{
      // this.reportsDetails = res
      this.getReports()
    })
  }

  onChange(type:any){
    this.searchByType = type;
  }

}
