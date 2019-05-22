import { CloseModalEventEmmiter } from "src/app/models";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { NavigationEventEmiter } from "./navigationEventEmiter";
import { ExitModalEventEmmiter } from "src/app/models";
import { SignUpProcessService } from "src/app/services/app-state/sign-up-process.service";

@Component({
  selector: "app-home-nav",
  templateUrl: "./home-nav.component.html",
  styleUrls: ["./home-nav.component.scss"]
})
export class HomeNavComponent implements OnInit {
  @Output() closeNavAction: EventEmitter<
    NavigationEventEmiter
  > = new EventEmitter();
  @Output() closeModalAction: EventEmitter<
    CloseModalEventEmmiter
  > = new EventEmitter();

  @Output() closeSigninModalAction: EventEmitter<
    ExitModalEventEmmiter
  > = new EventEmitter();

  showSignUp: boolean;
  showOverlay: boolean;

  constructor(private signUpProcessService: SignUpProcessService) {}

  ngOnInit() {}
  togleNav() {
    this.showSignUp = !this.showSignUp;
    this.showOverlay = !this.showOverlay;
  }

  closeNav() {
    this.closeNavAction.emit({
      closeNav: true
    });
  }
  closeOptions(e: CloseModalEventEmmiter) {}
  togleSignIn() {
    this.closeSigninModalAction.emit({
      close: true
    });
  }

  togleRegNav() {
    this.signUpProcessService.showPersonalInfoForm();
  }
}
