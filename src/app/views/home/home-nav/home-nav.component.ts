import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NavigationEventEmiter } from './navigationEventEmiter';
import { ExitModalEventEmmiter } from 'src/app/models';

@Component({
  selector: 'app-home-nav',
  templateUrl: './home-nav.component.html',
  styleUrls: ['./home-nav.component.scss']
})
export class HomeNavComponent implements OnInit {
  @Output() closeNavAction:
  EventEmitter<NavigationEventEmiter> = new EventEmitter();
  showSignUp: boolean;
  showOverlay: boolean;
 

  constructor() { }

  ngOnInit() { }
  togleNav() {
    this.showSignUp = !this.showSignUp;
    this.showOverlay = !this.showOverlay;
  }
  closeNav() {
    this.closeNavAction.emit({
      closeNav: true
    });
  }
  closeOptions(e: ExitModalEventEmmiter) {
    this.togleNav();
  }
}
