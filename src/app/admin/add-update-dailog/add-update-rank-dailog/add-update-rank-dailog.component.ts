import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IqacServiceService } from 'src/app/services/iqac-service.service';

@Component({
  selector: 'app-add-update-rank-dailog',
  templateUrl: './add-update-rank-dailog.component.html',
  styleUrls: ['./add-update-rank-dailog.component.scss']
})
export class AddUpdateRankDailogComponent implements OnInit {
  selectedRank: any;
  rankForm: FormGroup;
  rankType=["india today","nirf","the week hansa","atal ranking","qs","tle"]


  constructor(private fb:FormBuilder, 
    private http:HttpClient,
    private iqacService:IqacServiceService,
    private dialogRef: MatDialogRef<AddUpdateRankDailogComponent>,@Inject(MAT_DIALOG_DATA) data:any) {
    this.selectedRank = data;
    this.rankForm = this.fb.group({
      rank:[null],
      fromYear:[""],
      toYear:[""],
      type:[null]
  })
}

  ngOnInit(): void {
    if(this.selectedRank?.action === 'update'){
      const year = this.selectedRank.data.year.split('-')
      this.rankForm.patchValue({
        rank:this.selectedRank.data.rank1,
        fromYear:year[0],
        toYear:year[1],
        type:this.selectedRank.data.type1
      })
    }
  }

  onSubmit(){
    const formdata ={
      rank1:this.rankForm.value.rank,
      year:this.rankForm.value.fromYear.concat(-this.rankForm.value.toYear.toString()),
      type1:this.rankForm.value.type,
    }
    console.log("form",formdata);
    if(this.selectedRank.action === 'update'){
      this.iqacService.updateRank(this.selectedRank.data.id, formdata).subscribe(res=>{
        this.onClose()
      })
    }else{
      this.iqacService.addRank(formdata).subscribe(res=>{
        this.onClose()
      })
    }
    
  }

  onClose(){
    this.dialogRef.close()
  }

}
