import { SpinnerProcess, newSpinnerState } from './../../models/processes/spinner.process.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerProcessService {

  spinnerSbject = new BehaviorSubject<SpinnerProcess>(
    newSpinnerState
  );
  castSpinnerProcess = this.spinnerSbject.asObservable();
  constructor() { }



  getSpinnerProcessState() {
    return this.spinnerSbject.value;
  }

  showSpinner() {
    const state = this.getSpinnerProcessState();
    state.showSpinner = true;
    this.spinnerSbject.next(state);
  }
  closeSpinner(){
    const state = this.getSpinnerProcessState();
    state.showSpinner = false;
    this.spinnerSbject.next(state);
  }

}
