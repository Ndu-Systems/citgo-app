import { Component, OnInit } from "@angular/core";
import { ExitModalEventEmmiter } from "src/app/models";
import { NavigationEventEmiter } from "./home-nav/navigationEventEmiter";
import { SignUpProcessService } from "src/app/services/app-state/sign-up-process.service";
import { LoginProcessService } from "src/app/services/app-state/login-process.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  showOverlay: boolean;
  showSignUp: boolean;
  showBankingInfoForm: boolean;
  showBenefitariesForm: boolean;
  showNav: boolean;
  showSignIn: boolean;
  showEmailSentScreen: boolean;
  showForgotPassword: boolean;

  constructor(private signUpProcessService: SignUpProcessService, private loginProcessService:LoginProcessService) {}

  ngOnInit() {
    this.signUpProcessService.castUserRegistrationProcess.subscribe(process => {
      this.showEmailSentScreen = process.showVerificationMailSent;
      this.showSignUp = process.whichModalToShow.showPersonalInfoForm;
      this.showBankingInfoForm = process.whichModalToShow.showBankingInfoForm;
      this.showBenefitariesForm = process.whichModalToShow.showBenefitariesForm;
      this.showOverlay = process.whichModalToShow.showOverlay;
    });

    // login
    this.loginProcessService.castUserLoginProcess.subscribe(process=>{
      this.showSignIn = process.showLogin;
      this.showForgotPassword = process.showResetPass;
      this.showOverlay = process.showOverlay;
    })
  }
  togleNav() {
    this.showSignUp = !this.showSignUp;
    this.showOverlay = !this.showOverlay;
  }
  OpenNav() {
    this.showNav = !this.showNav;
  }

  openSignUp() {
    this.showSignIn = !this.showSignIn;
    this.showOverlay = !this.showOverlay;
  }
  closeSignIn(event: ExitModalEventEmmiter) {
    this.openSignUp();
  }
  closeNav(event: NavigationEventEmiter) {
    this.OpenNav();
  }

  cloaseAll() {
    this.showSignUp = false;
    this.showBankingInfoForm = false;
    this.showBenefitariesForm = false;
  }
}
