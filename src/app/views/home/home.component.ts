import { SpinnerProcessService } from './../../services/app-state/spinner-process.service';
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
  showNav: boolean;
  showEmailSentScreen: boolean;
  showEmailNotificationScreen: boolean;
  showSpinner:boolean;
  message: string;
  constructor(
    private signUpProcessService: SignUpProcessService,
    private loginProcessService: LoginProcessService,
    private navigationProcessService: NavigationProcessService,
    private spinnerProcessService: SpinnerProcessService

  ) {

  }

  ngOnInit() {
    this.signUpProcessService.castUserRegistrationProcess.subscribe(process => {
      this.showEmailSentScreen = process.showVerificationMailSent;
      this.showOverlay = process.whichModalToShow.showOverlay;
    });

    //nav
    this.navigationProcessService.castNavigationProcess.subscribe(process=>{
      this.showNav = process.showNav;
    })
    // spinner 

    this.spinnerProcessService.castSpinnerProcess.subscribe(process=>{
      this.showSpinner = process.showSpinner;
    })

    // login
    this.loginProcessService.castUserLoginProcess.subscribe(process => {
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
