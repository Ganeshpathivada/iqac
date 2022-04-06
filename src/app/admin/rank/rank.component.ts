import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddUpdateRankDailogComponent } from '../add-update-dailog/add-update-rank-dailog/add-update-rank-dailog.component';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.scss']
})
export class RankComponent implements OnInit {
  url = "http://localhost:8080/api/v1/rank/";
  searchData:any;
  rankDetails:any;
  // = [
  //   {rank:1, year:2012, type:"india today"},
  //   {rank:2, year:2013, type:"nirf"},
  //   {rank:3, year:2013, type:"the week hansa"},
  //   {rank:4, year:2013, type:"atal ranking"},
  //   {rank:5, year:2014, type:"qs"},
  //   {rank:5, year:2015, type:"tle"},
  //   {rank:5, year:2016, type:"nirf"},
  //   {rank:5, year:2017, type:"nirf"},
  // ];
  searchByType:any ="nirf";
  pageIndex = 1;
  action: any;
  selectedRank: any;

  constructor(private dialog: MatDialog, private http:HttpClient) { }

  ngOnInit(): void {
    this.getRank()
  }

  getRank(){
    this.http.get(this.url).subscribe(res=>{
      this.rankDetails = res
    })
  }

  addRank(){
    this.action="add";
    this.addUpdateRank();
  }
  editRank(rank:any){
    this.selectedRank = rank;
    this.action="update";
    this.addUpdateRank();
  }

  addUpdateRank(){
const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    (dialogConfig.width = "350px"),
      (dialogConfig.data = {
        action: this.action,
        data: this.selectedRank,
      });
    const dialogRef = this.dialog.open(
      AddUpdateRankDailogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((data) => {
      console.log("Dialog output:", data);
      this.getRank()
      // if (data.action === "add") {
      //   if (data.data != null) {
      //   }
      // } else {
      // }
    });
  }

  deleteRank(rank:any){
    this.http.delete(this.url + rank.id).subscribe(res=>{
      // this.rankDetails = res
      this.getRank()
    })
  }

  onChange(type:any){
    this.searchByType = type;
  }

}
