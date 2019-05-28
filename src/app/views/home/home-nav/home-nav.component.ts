import { CloseModalEventEmmiter } from "src/app/models";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { ExitModalEventEmmiter } from "src/app/models";
import { SignUpProcessService } from "src/app/services/app-state/sign-up-process.service";
import { LoginProcessService } from "src/app/services/app-state/login-process.service";
import { NavigationProcessService } from "src/app/services";

@Component({
  selector: "app-home-nav",
  templateUrl: "./home-nav.component.html",
  styleUrls: ["./home-nav.component.scss"]
})
export class HomeNavComponent implements OnInit {
  showOverlay: boolean;

  constructor(
    private signUpProcessService: SignUpProcessService,
    private loginProcess: LoginProcessService,
    private navigationProcessService: NavigationProcessService
  ) {}

  ngOnInit() {}

  closeNav() {
    this.navigationProcessService.closeNav();
  }
  showSignIn() {
    this.loginProcess.showLogin();
  }
  showSignUp() {
    this.signUpProcessService.showPersonalInfoForm();
  }
}
