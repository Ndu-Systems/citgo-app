import { Component, OnInit } from "@angular/core";
import { ExitModalEventEmmiter } from "src/app/models";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
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
