import { Router } from '@angular/router';
import { LoginProcessService } from './../../../services/app-state/login-process.service';
import { Component, OnInit } from '@angular/core';
import {CloseModalEventEmmiter, ExitModalEventEmmiter } from 'src/app/models';
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
  showSignIn: boolean;

  constructor(private loginProcessService:LoginProcessService, private router: Router) { }

  ngOnInit() { }
  togleNav() {
    this.showSignUp = !this.showSignUp;
    this.showOverlay = !this.showOverlay;
  }
  OpenNav() {
    this.showNav = !this.showNav;
  }

  openSignUp(){
    this.showSignIn = !this.showSignIn;
    this.showOverlay = !this.showOverlay;
  }
  closeSignIn(event: ExitModalEventEmmiter){
    this.openSignUp();
  }
  closeNav(event: NavigationEventEmiter) {
    this.OpenNav();
  }

  closeModal(e: CloseModalEventEmmiter) {
    this.cloaseAll();    
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
investNow(){
  this.router.navigate(['sign-in'])
}
}
