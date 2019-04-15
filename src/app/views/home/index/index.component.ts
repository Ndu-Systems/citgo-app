import { Component, OnInit } from '@angular/core';
import { ExitModalEventEmmiter } from 'src/app/models';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  showSignUp: boolean;
  showOverlay: boolean;

  constructor() {}

  ngOnInit() {}
  togleNav() {
    this.showSignUp = !this.showSignUp;
    this.showOverlay = !this.showOverlay;
  }
  closeOptions(e: ExitModalEventEmmiter) {
    this.togleNav();
    //   if(e.close){
    //     this.showOverlay = false;
    //   }
    // }
  }

}
