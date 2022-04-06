import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup } from '@angular/forms';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IqacServiceService } from 'src/app/services/iqac-service.service';

@Component({
  selector: 'app-add-update-staff-dailog',
  templateUrl: './add-update-staff-dailog.component.html',
  styleUrls: ['./add-update-staff-dailog.component.scss']
})
export class AddUpdateStaffDailogComponent implements OnInit {

  registerStaff : FormGroup;
  address:any;
  url = "http://localhost:8080/api/v1/staff/"
  patentUrl = "http://localhost:8080/patent/patents/"
  staffData: any;
  selectedFaculity: any = {};

  constructor(private fb:FormBuilder, private http:HttpClient, private router:Router, private iqacService: IqacServiceService
    // private dialogRef: MatDialogRef<AddUpdateStaffDailogComponent>,
    // @Inject(MAT_DIALOG_DATA) data:any
    ) {
    // this.selectedFaculity = data;
    this.registerStaff = this.fb.group({
      id:[0],
      name : [""],
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
      sno:[null],
      empNo:[null],
      patentDto: this.fb.array([this.getPatentsDetails()]),
      bookDto: this.fb.array([this.getBookDetails()]),
      rpDto: this.fb.array([this.getResearchPapersDetails()])
    })
    
  }

  

  ngOnInit(): void {
    this.selectedFaculity = this.iqacService.faculityData
    console.log("selected", this.selectedFaculity)
    if(this.selectedFaculity === undefined){
      this.iqacService.faculityData = {action:"add"}
      this.selectedFaculity = this.iqacService.faculityData
      console.log("selected", this.selectedFaculity)
    }
    console.log("selected", this.selectedFaculity)
    if(this.selectedFaculity?.action === "update"){
      console.log("cons", this.selectedFaculity)
      this.registerStaff.patchValue({
        name : this.selectedFaculity?.data.name,
        dpmt : this.selectedFaculity?.data.dpmt,
        dob : this.selectedFaculity?.data.dob,
        gender : this.selectedFaculity?.data.gender,
        category : this.selectedFaculity?.data.category,  
        qualification : this.selectedFaculity?.data.qualification,
        presentPosition : this.selectedFaculity?.data.presentPosition,
        doj : this.selectedFaculity?.data.doj,
        teachingExp : this.selectedFaculity?.data.teachingExp,
        industrialExp : this.selectedFaculity?.data.industrialExp,
        panNumber : this.selectedFaculity?.data.panNumber,
        aadharNumber :this.selectedFaculity?.data.aadharNumber,
        phone : this.selectedFaculity?.data.phone,
        emailId : this.selectedFaculity?.data.emailId,
        awards : this.selectedFaculity?.data.awards,
        noOfPhd : this.selectedFaculity?.data.noOfPhd,
        booksAuthored : this.selectedFaculity?.data.booksAuthored,
        noOfResearchPapers : this.selectedFaculity?.data.noOfResearchPapers,
        totalNoOfResearch :this.selectedFaculity?.data.totalNoOfResearch,
        sno: this.selectedFaculity?.data.sno,
        empNo:this.selectedFaculity?.data.empNo,
        patentDto:this.editPatents(this.selectedFaculity?.data.patentDto),
        bookDto:this.editBook(this.selectedFaculity?.data.bookDto),
        rpDto:this.editResearchPapers(this.selectedFaculity?.data.rpDto)
      })
      

      
    }
    // this.http.get(this.patentUrl + 2, ).subscribe(res=>{
    //   console.log("patent",res)
    // })
    
  }

  //  BOOKS

  getBookDetails(): FormGroup{
    return this.fb.group({
      titleOfBook:[""],
      titleOfBookChapter:[""],
      isbnNo:[""],
      yearOfPublishing:[""],
      nationalOrInternational:[""],
      affiliatingInst:[""]
    })
  }

  get bookFormGroups () {
    return this.registerStaff.get('bookDto') as FormArray
  }

  public removeBookDetails(index:number): void {
    (<FormArray>this.registerStaff.get('bookDto')).removeAt(index)
  }

  public addBookDetails(): void{
    (<FormArray>this.registerStaff.get('bookDto')).push(this.getBookDetails());
  }


  editBook(book:any){
    // let patentsArray: FormArray = new FormArray([])
    this.removeBookDetails(0)
    book.forEach((element:any) => {
      (<FormArray>this.registerStaff.get('bookDto')).push(
        this.fb.group({
          id:element.id,
          titleOfBook:element.titleOfBook,
          titleOfBookChapter:element.titleOfBookChapter,
          isbnNo:element.isbnNo,
          yearOfPublishing:element.yearOfPublishing,
          nationalOrInternational:element.nationalOrInternational,
          affiliatingInst:element.affiliatingInst
        })
      )
    });
    // return patentsArray
  }

  // RESERCH PAPERS

  getResearchPapersDetails(): FormGroup{
    return this.fb.group({
      nameOfTheAuthors:[""],
      titleOfThePapers:[""],
      journalnameVolPP:[""],
      issnNo:[""],
      nationalOrInternational:[""],
      academicYear:[""]
    })
  }

  get researchPapersFormGroups () {
    return this.registerStaff.get('rpDto') as FormArray
  }

  public removeResearchPapersDetails(index:number): void {
    (<FormArray>this.registerStaff.get('rpDto')).removeAt(index)
  }

  public addResearchPapersDetails(): void{
    (<FormArray>this.registerStaff.get('rpDto')).push(this.getResearchPapersDetails());
  }


  editResearchPapers(book:any){
    // let patentsArray: FormArray = new FormArray([])
    this.removeResearchPapersDetails(0)
    book.forEach((element:any) => {
      (<FormArray>this.registerStaff.get('rpDto')).push(
        this.fb.group({
          id:element.id,
          nameOfTheAuthors:element.nameOfTheAuthors,
          titleOfThePapers:element.titleOfThePapers,
          journalnameVolPP:element.journalnameVolPP,
          issnNo:element.issnNo,
          nationalOrInternational:element.nationalOrInternational,
          academicYear:element.academicYear
        })
      )
    });
    // return patentsArray
  }


  // PATENTS

  getPatentsDetails(): FormGroup{
    return this.fb.group({
      title:[""],
      yearOfAward:[""],
      status:[""],
      nationalOrInternational:[""]
    })
  }
  get patentFormGroups () {
    return this.registerStaff.get('patentDto') as FormArray
  }

  public removePatentDetails(index:number): void {
    (<FormArray>this.registerStaff.get('patentDto')).removeAt(index)
  }

  public addPatentDetails(): void{
    (<FormArray>this.registerStaff.get('patentDto')).push(this.getPatentsDetails());
  }

  editPatents(patents:any){
    // let patentsArray: FormArray = new FormArray([])
    this.removePatentDetails(0)
    patents.forEach((element:any) => {
      (<FormArray>this.registerStaff.get('patentDto')).push(
        this.fb.group({
          id:element.id,
          title:element.title,
          yearOfAward:element.yearOfAward,
          status:element.status,
          nationalOrInternational:element.nationalOrInternational
        })
      )
    });
    // return patentsArray
  }

  onSubmit(){
    console.log("sss",this.registerStaff.value)
    
    if(this.selectedFaculity?.action === "update"){
      this.http.put(this.url + this.selectedFaculity?.data.id, this.registerStaff.value).subscribe(res=>{
        console.log("update", res)
        this.router.navigateByUrl('/admin/staff')
      })
    }else{
      // const formData = {
      //   name : this.registerStaff.value.name,
      //   dpmt : this.registerStaff.value.dpmt,
      //   dob : this.registerStaff.value.dob,
      //   gender : this.registerStaff.value.gender,
      //   category : this.registerStaff.value.category,
      //   qualification : this.registerStaff.value.qualification,
      //   presentPosition : this.registerStaff.value.presentPosition,
      //   doj : this.registerStaff.value.doj,
      //   teachingExp : this.registerStaff.value.teachingExp,
      //   industrialExp : this.registerStaff.value.industrialExp,
      //   panNumber : this.registerStaff.value.panNumber,
      //   aadharNumber :this.registerStaff.value.aadharNumber,
      //   phone : this.registerStaff.value.phone,
      //   emailId : this.registerStaff.value.emailId,
      //   awards : this.registerStaff.value.awards,
      //   noOfPhd : this.registerStaff.value.noOfPhd,
      //   booksAuthored : this.registerStaff.value.booksAuthored,
      //   noOfResearchPapers : this.registerStaff.value.noOfResearchPapers,
      //   totalNoOfResearch :this.registerStaff.value.totalNoOfResearch,
      //   sno: this.registerStaff.value.sno,
      //   empNo:this.registerStaff.value.empNo,
      // }
      this.http.post(this.url, this.registerStaff.value).subscribe(res=>{
        this.router.navigateByUrl('/admin/staff')
      })
    }
  }

  // onClose(){
  //   this.dialogRef.close()
  // }
  
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
  }
}
