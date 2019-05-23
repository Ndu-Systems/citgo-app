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
  constructor() {}



  getUserLoginProcess() {
    return this.userLoginProcess.value;
  }

  showLogin() {
    debugger
    let state = this.getUserLoginProcess();
    state.showResetPass = false
    state.showLogin = true
    state.showOverlay = true
    this.userLoginProcess.next(state);
  }

  showChangePass() {
    let state = this.getUserLoginProcess();
    state.showResetPass = true
    state.showLogin = false
    state.showOverlay = true
    this.userLoginProcess.next(state);
  }
  closeAll() {
    let state = this.getUserLoginProcess();
    state.showResetPass = false
    state.showLogin = false
    state.showOverlay = false
    this.userLoginProcess.next(state);
  }
}
