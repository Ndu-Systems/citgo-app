import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  showSignUp: boolean;

  constructor() { }

  ngOnInit() {
  }
  togleNav(){
    this.showSignUp = !this.showSignUp;
  }
  closeModalActionEvent(){
    alert(3)
  }

}
