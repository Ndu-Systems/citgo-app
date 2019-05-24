import { newLoginProcess } from './../../models/processes/login.process.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginProcess } from 'src/app/models/processes/login.process.model';

@Injectable({
  providedIn: 'root'
})
export class LoginProcessService {

  userLoginProcess = new BehaviorSubject<LoginProcess>(
    newLoginProcess
  );
  castUserLoginProcess = this.userLoginProcess.asObservable();
  constructor() { }



  getUserLoginProcess() {
    return this.userLoginProcess.value;
  }

  showLogin() {
    const state = this.getUserLoginProcess();
    state.showResetPass = false;
    state.showLogin = true;
    state.showOverlay = true;
    state.showEmailNotification = false;
    this.userLoginProcess.next(state);
  }

  showChangePass() {
    const state = this.getUserLoginProcess();
    state.showResetPass = true;
    state.showLogin = false;
    state.showOverlay = true;
    state.showEmailNotification = false;
    this.userLoginProcess.next(state);
  }
  showEmailNotification(message: string) {
    const state = this.getUserLoginProcess();
    state.showResetPass = true;
    state.showLogin = false;
    state.showOverlay = false;
    state.showEmailNotification = true;
    state.message = message;
    this.userLoginProcess.next(state);
  }
  closeAll() {
    const state = this.getUserLoginProcess();
    state.showResetPass = false;
    state.showLogin = false;
    state.showOverlay = false;
    state.showEmailNotification = false;
    this.userLoginProcess.next(state);
  }
}
