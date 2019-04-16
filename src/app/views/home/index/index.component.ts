import { Component, OnInit } from '@angular/core';
import { ExitModalEventEmmiter } from 'src/app/models';
import { NavigationEventEmiter } from '../home-nav/navigationEventEmiter';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  showSignUp: boolean;
  showOverlay: boolean;
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
  closeOptions(e: ExitModalEventEmmiter) {
    this.togleNav();
  }

}
