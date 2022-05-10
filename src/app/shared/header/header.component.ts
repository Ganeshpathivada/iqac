import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public pathname: any;

  constructor(private router: Router) {
   }

  ngOnInit(): void {
    setTimeout(() => {
      this.pathname = location.pathname;
     }, 10);
    
  }

  onChangeHeader(event:any){
   setTimeout(() => {
    this.pathname = this.router.url;
   }, 10);
  }

}
