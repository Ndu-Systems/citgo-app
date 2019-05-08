import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-nav',
  templateUrl: './dashboard-nav.component.html',
  styleUrls: ['./dashboard-nav.component.scss']
})
export class DashboardNavComponent implements OnInit {

  constructor(
    private routeTo: Router,
  ) { }

  ngOnInit() {
  }
  logout() {
    this.routeTo.navigate(['/']);
  }

  toggleBuyShares() {
    alert("Pop up comming here")
  }
}
