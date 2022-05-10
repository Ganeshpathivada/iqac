import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IqacServiceService } from 'src/app/services/iqac-service.service';
import { AddUpdateRankDailogComponent } from '../add-update-dailog/add-update-rank-dailog/add-update-rank-dailog.component';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.scss']
})
export class RankComponent implements OnInit {
  searchData:any;
  rankDetails:any;
  p:number = 1;
  public itemsPerPage: number = 10;
  searchByType:any ="nirf";
  pageIndex = 1;
  action: any;
  selectedRank: any;

  constructor(private dialog: MatDialog, private http:HttpClient, private iqacService:IqacServiceService) { }

  ngOnInit(): void {
    this.getRank()
  }

  getRank(){
    this.iqacService.getRank().subscribe(res=>{
      this.rankDetails = res;
      this.p = 1
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
    this.iqacService.deleteRank(rank.id).subscribe(res=>{
      // this.rankDetails = res
      this.getRank()
    })
  }

  onChange(type:any){
    this.searchByType = type;
  }

}
