import { ADMIN_USER_ROLE } from './../../../shared/config';

import { User } from "src/app/models/user";
import {
  AuthenticateService
} from "src/app/services";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard-nav",
  templateUrl: "./dashboard-nav.component.html",
  styleUrls: ["./dashboard-nav.component.scss"]
})
export class DashboardNavComponent implements OnInit {

  user: User; 
  IsUserAdmin:boolean; 

  constructor(
    private routeTo: Router,
    private authenticateService: AuthenticateService,

  ) {}
  ngOnInit() {
    this.user = this.authenticateService.currentUserValue;
    this.IsUserAdmin = this.user.Role == ADMIN_USER_ROLE;

   
  }
  logout() {
    this.authenticateService.logout();
    this.routeTo.navigate(["/"]);
  }

}
