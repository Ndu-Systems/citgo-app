import { Component, OnInit } from '@angular/core';
import { ExitModalEventEmmiter, CloseModalEventEmmiter } from 'src/app/models';
import { NavigationEventEmiter } from '../home-nav/navigationEventEmiter';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  showOverlay: boolean ;
  showSignUp: boolean;
  showBankingInfoForm: boolean;
  showBenefitariesForm: boolean;
  showNav: boolean;

  constructor() { }

  ngOnInit() { }
  togleNav() {
    this.showSignUp = !this.showSignUp;
    this.showOverlay = !this.showOverlay;
  }
  OpenNav() {
    this.showNav = !this.showNav;
  }

  closeNav(event: NavigationEventEmiter) {
    this.OpenNav();
  }
 
  closeModal(e:CloseModalEventEmmiter){
    this.cloaseAll()
    console.log(e);
    // alert(JSON.stringify(e))
    if(e.closeAll){
      this.showOverlay = false;
    }
    else if(e.showBankingInfoForm){
      this.showSignUp = false;
      this.showBankingInfoForm = true;
    }
    else if(e.showBenefitariesForm){
      this.showSignUp = false;
      this.showBankingInfoForm = false;
      this.showBenefitariesForm = true;
    }
  }
  cloaseAll(){
    this.showSignUp = false;
    this.showBankingInfoForm = false;
    this.showBenefitariesForm = false;
  }

}
