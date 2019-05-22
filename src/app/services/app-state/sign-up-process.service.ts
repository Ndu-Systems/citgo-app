import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { SignUpProcess, newProcess } from "src/app/models/signup.process.model";
import { initModalEvent } from "src/app/models";

@Injectable({
  providedIn: "root"
})
export class SignUpProcessService {
  userRegistrationProcessActive = new BehaviorSubject<SignUpProcess>(
    newProcess
  );
  castUserRegistrationProcess = this.userRegistrationProcessActive.asObservable();
  constructor() {}

  finishRegistrationProcess() {
    this.userRegistrationProcessActive.next(newProcess);
  }
  updateRegistrationProcessState(state) {
    this.userRegistrationProcessActive.next(state);
  }

  getRegistraionProcess() {
    return this.userRegistrationProcessActive.value;
  }

  showVerificationMailSent() {
    let state = this.getRegistraionProcess();
    state.showVerificationMailSent = true;
    this.userRegistrationProcessActive.next(state);
  }

  // modals

  showPersonalInfoForm() {
    let state = this.getRegistraionProcess();
    state.whichModalToShow.showOverlay = true;
    state.whichModalToShow.showPersonalInfoForm = true;
    this.userRegistrationProcessActive.next(state);
  }

  showBankingInfoForm() {
    let state = this.getRegistraionProcess();
    state.whichModalToShow.showOverlay = true;
    state.whichModalToShow.showBankingInfoForm = true;
    this.userRegistrationProcessActive.next(state);
  }

  showBeneficiariesInfoForm() {
    let state = this.getRegistraionProcess();
    state.whichModalToShow.showOverlay = true;
    state.whichModalToShow.showBenefitariesForm = true;
    this.userRegistrationProcessActive.next(state);
  }

  closeAllSignUpForms() {
    let state = this.getRegistraionProcess();
    state.whichModalToShow = initModalEvent;
    this.userRegistrationProcessActive.next(state);
  }
  //--modals
}
