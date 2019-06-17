import { Component, OnInit } from "@angular/core";
import { SignUpProcessService } from "src/app/services/app-state/sign-up-process.service";
import { LoginProcessService } from "src/app/services/app-state/login-process.service";
import { NavigationProcessService } from "src/app/services";

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
  showEmailNotificationScreen: boolean;
  showForgotPassword: boolean;
  message: string;
  constructor(
    private signUpProcessService: SignUpProcessService,
    private loginProcessService: LoginProcessService,
    private navigationProcessService: NavigationProcessService
  ) {

  }

  ngOnInit() {
    this.signUpProcessService.castUserRegistrationProcess.subscribe(process => {
      this.showEmailSentScreen = process.showVerificationMailSent;
      this.showSignUp = process.whichModalToShow.showPersonalInfoForm;
      this.showBankingInfoForm = process.whichModalToShow.showBankingInfoForm;
      this.showBenefitariesForm = process.whichModalToShow.showBenefitariesForm;
      this.showOverlay = process.whichModalToShow.showOverlay;
    });

    //nav
    this.navigationProcessService.castNavigationProcess.subscribe(process=>{
      this.showNav = process.showNav;
    })

    // login
    this.loginProcessService.castUserLoginProcess.subscribe(process => {
      this.showSignIn = process.showLogin;
      this.showForgotPassword = process.showResetPass;
      this.showOverlay = process.showOverlay;
      this.showEmailNotificationScreen = process.showEmailNotification;
      this.message = process.message;
    });


  }

  OpenNav(){
    this.navigationProcessService.showNav();
  }
  openSignUp(){
    this.signUpProcessService.showPersonalInfoForm();
  }
  openSignIn(){
    this.loginProcessService.showLogin();
  }

}
