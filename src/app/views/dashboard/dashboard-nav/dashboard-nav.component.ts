import { AuthenticateService } from 'src/app/services/user/authenticate.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExitModalEventEmmiter } from 'src/app/models';

@Component({
  selector: 'app-dashboard-nav',
  templateUrl: './dashboard-nav.component.html',
  styleUrls: ['./dashboard-nav.component.scss']
})
export class DashboardNavComponent implements OnInit {

  showBuyShares: boolean = false;
  showOverlay: boolean = false;
  constructor(
    private routeTo: Router,
    private authenticateService:AuthenticateService
  ) { }

  ngOnInit() {
  }
  logout() {
    this.authenticateService.logout();
    this.routeTo.navigate(['/']);
  }

  toggleBuyShares() {
    this.showBuyShares = !this.showBuyShares;
    return this.showOverlay = !this.showOverlay;
  }

  closeModal(event: ExitModalEventEmmiter) {
    event.close = this.toggleBuyShares();
  }
}
