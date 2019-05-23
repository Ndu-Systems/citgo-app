import { CloseModalEventEmmiter } from "src/app/models";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { ExitModalEventEmmiter } from "src/app/models";
import { SignUpProcessService } from "src/app/services/app-state/sign-up-process.service";
import { LoginProcessService } from "src/app/services/app-state/login-process.service";

@Component({
  selector: "app-home-nav",
  templateUrl: "./home-nav.component.html",
  styleUrls: ["./home-nav.component.scss"]
})
export class HomeNavComponent implements OnInit {
  @Output() closeModalAction: EventEmitter<
    CloseModalEventEmmiter
  > = new EventEmitter();

  @Output() closeSigninModalAction: EventEmitter<
    ExitModalEventEmmiter
  > = new EventEmitter();

  showSignUp: boolean;
  showOverlay: boolean;

  constructor(
    private signUpProcessService: SignUpProcessService,
    private loginProcess: LoginProcessService
  ) {}

  ngOnInit() {}
  togleNav() {
    this.showSignUp = !this.showSignUp;
    this.showOverlay = !this.showOverlay;
  }

  closeNav() {
    this.loginProcess.showLogin();
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
