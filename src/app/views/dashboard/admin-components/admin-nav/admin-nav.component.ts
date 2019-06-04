import { Component, OnInit } from "@angular/core";
import { Client, ExitModalEventEmmiter } from "src/app/models";
import { User } from "src/app/models/user";
import { Router } from "@angular/router";
import {
  AuthenticateService,
  DocumentsService,
  CleintService,
  NotificationProcessService
} from "src/app/services";
import { WEB_HOST, REFERALLINK } from "src/app/shared/config";
import { UserNotification } from "src/app/models/processes/notification.process.model";

@Component({
  selector: "app-admin-nav",
  templateUrl: "./admin-nav.component.html",
  styleUrls: ["./admin-nav.component.scss"]
})
export class AdminNavComponent implements OnInit {
  client;
  user: User;
  constructor(
    private authenticateService: AuthenticateService,
    private cleintService: CleintService
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
}
