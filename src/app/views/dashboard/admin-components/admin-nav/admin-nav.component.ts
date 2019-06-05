import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user";
import { Router } from "@angular/router";
import {
  AuthenticateService,
  CleintService
} from "src/app/services";

@Component({
  selector: "app-admin-nav",
  templateUrl: "./admin-nav.component.html",
  styleUrls: ["./admin-nav.component.scss"]
})
export class AdminNavComponent implements OnInit {
  client;
  user: User;
  showOverlay;
  constructor(
    private authenticateService: AuthenticateService,
    private cleintService: CleintService,
    private routeTo:Router
  ) {
    this.user = this.authenticateService.currentUserValue;
  }
  ngOnInit(): void {
    this.cleintService.getClientById(this.user.ClientId).subscribe(r => {
      this.client = r;
    });
  }
  showMobileNav: boolean;
  openMobileNav() {
    this.showMobileNav = true;
  }
  closeMobileNav() {
    this.showMobileNav = false;
  }
  logout() {
    this.authenticateService.logout();
    this.routeTo.navigate(["/"]);
  }
}
