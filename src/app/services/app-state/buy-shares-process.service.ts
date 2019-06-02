import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BuySharesProcess, newBuySharesState } from 'src/app/models/processes/buy-shares.process.model';

@Injectable({
  providedIn: 'root'
})
export class BuySharesProcessService {


  buySharesProcess = new BehaviorSubject<BuySharesProcess>(
    newBuySharesState
  );
  castBuySharesProcess = this.buySharesProcess.asObservable();
  constructor() { }



  getBuySharesProcessState() {
    return this.buySharesProcess.value;
  }

  showBuyShares() {
    const state = this.getBuySharesProcessState();
    state.showBuyForm = true;
    state.showOverlay = true;
    this.buySharesProcess.next(state);
  }
  closeBuyShares(){
    const state = this.getBuySharesProcessState();
    state.showBuyForm = false;
    state.showOverlay = false;
    this.buySharesProcess.next(state);
  }

}
