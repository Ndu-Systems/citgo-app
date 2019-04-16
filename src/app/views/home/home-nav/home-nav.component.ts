import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NavigationEventEmiter } from './navigationEventEmiter';

@Component({
  selector: 'app-home-nav',
  templateUrl: './home-nav.component.html',
  styleUrls: ['./home-nav.component.scss']
})
export class HomeNavComponent implements OnInit {
  @Output() closeNavAction:
  EventEmitter<NavigationEventEmiter> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  closeNav() {
    this.closeNavAction.emit({
      closeNav: true
    });
  }
}
