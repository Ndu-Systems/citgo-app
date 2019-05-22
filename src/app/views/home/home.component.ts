import { AccountService } from "./services/account.service";
import { Component, OnInit } from "@angular/core";
import { ExitModalEventEmmiter, CloseModalEventEmmiter } from "src/app/models";
import { NavigationEventEmiter } from "./home-nav/navigationEventEmiter";
import { SignUpProcessService } from "src/app/services/app-state/sign-up-process.service";

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

  constructor(
    private accountService: AccountService,
    private signUpProcessService: SignUpProcessService
  ) {}

  ngOnInit() {
    this.signUpProcessService.castUserRegistrationProcess.subscribe(process => {
      this.showEmailSentScreen = process.isProcessRunning;
      this.showSignUp = process.whichModalToShow.showPersonalInfoForm;
      this.showBankingInfoForm = process.whichModalToShow.showBankingInfoForm;
      this.showBenefitariesForm = process.whichModalToShow.showBenefitariesForm;
      this.showOverlay = process.whichModalToShow.showOverlay;
    });
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

  closeModal(e: CloseModalEventEmmiter) {
    this.cloaseAll();
    console.log(e);
    //  alert(JSON.stringify(e))
    if (e.closeAll) {
      this.showOverlay = false;
    } else if (e.showPersonalInfoForm) {
      this.showOverlay = true;
      this.showSignUp = true;
    } else if (e.showBankingInfoForm) {
      this.showSignUp = false;
      this.showBankingInfoForm = true;
    } else if (e.showBenefitariesForm) {
      this.showSignUp = false;
      this.showBankingInfoForm = false;
      this.showBenefitariesForm = true;
    }
  }
  cloaseAll() {
    this.showSignUp = false;
    this.showBankingInfoForm = false;
    this.showBenefitariesForm = false;
  }
}
