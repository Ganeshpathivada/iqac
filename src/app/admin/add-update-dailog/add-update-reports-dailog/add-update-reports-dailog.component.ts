import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IqacServiceService } from 'src/app/services/iqac-service.service';

@Component({
  selector: 'app-add-update-reports-dailog',
  templateUrl: './add-update-reports-dailog.component.html',
  styleUrls: ['./add-update-reports-dailog.component.scss']
})
export class AddUpdateReportsDailogComponent implements OnInit {
  selectedReport: any;
  reportName: FormGroup;
  reportType=["pdf","excel","doc"]
  data: any;


  constructor(private fb:FormBuilder, 
    private http:HttpClient,
    private iqacService: IqacServiceService,
    private dialogRef: MatDialogRef<AddUpdateReportsDailogComponent>,@Inject(MAT_DIALOG_DATA) data:any) {
    this.selectedReport = data;
    this.reportName = this.fb.group({
      // docName:[""],
      file:[""]
  })
}

  ngOnInit(): void {
    if(this.selectedReport?.action === 'update'){
      // this.rankForm.patchValue({
      //   rank:this.selectedRank.data.rank1,
      // })
    }
  }

  onChangeFile(event:any){
    for (let i = 0; i < event.target.files.length; i++) {
      // this.imageFile.push(event.target.files[i])
      this.data = event.target.files[0]

    }
  }

  onSubmit(){
    const formData = new FormData()
    // formData.append('docName', this.reportName.value.docName)
    formData.append('file', this.data)
    // formData.append('docType', "pdf")
    this.iqacService.addReport(formData).subscribe(res=>{
      this.onClose()
    })
  }

  onClose(){
    this.dialogRef.close()
  }

}

