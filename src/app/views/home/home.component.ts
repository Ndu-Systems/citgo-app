import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  showSignUp: boolean =true;
  showOverlay: boolean =true;

  constructor() { }

  ngOnInit() {
  }
  togleNav(){
    this.showSignUp = !this.showSignUp;
    this.showOverlay = !this.showOverlay;
  }
  closeModalActionEvent(){
    alert(3)
  }

}
