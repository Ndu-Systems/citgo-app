import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NavigationProcess ,newNavState} from 'src/app/models/processes/navigation.process.model';

@Injectable({
  providedIn: 'root'
})
export class NavigationProcessService {

  navigationProcess = new BehaviorSubject<NavigationProcess>(
    newNavState
  );
  castNavigationProcess = this.navigationProcess.asObservable();
  constructor() { }



  getNavigationProcessState() {
    return this.navigationProcess.value;
  }

  showNav() {
    const state = this.getNavigationProcessState();
    state.showNav = true;
    this.navigationProcess.next(state);
  }
  closeNav(){
    const state = this.getNavigationProcessState();
    state.showNav = false;
    this.navigationProcess.next(state);
  }
}
