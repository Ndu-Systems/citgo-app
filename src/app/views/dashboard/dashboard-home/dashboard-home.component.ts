import { Component, OnInit } from "@angular/core";
import {
  AuthenticateService,
  LoginProcessService,
  NotificationProcessService
} from "src/app/services";
import { User } from "src/app/models/user";
import { Router } from "@angular/router";
import { DEFAULT_PASSWORD } from "src/app/shared/config";

@Component({
  selector: "app-dashboard-home",
  templateUrl: "./dashboard-home.component.html",
  styleUrls: ["./dashboard-home.component.scss"]
})
export class DashboardHomeComponent implements OnInit {
  currentUser: User;
  showUplaod: boolean;
  constructor(
    private authenticateService: AuthenticateService,
    private loginProcess: LoginProcessService,
    private notificationProcessService: NotificationProcessService,
    private router: Router
  ) {}

  ngOnInit() {
    const user = this.authenticateService.currentUserValue;
    this.authenticateService
      .getFullClientDetails(user.UserId)
      .subscribe(response => {
        if (response.UserId) {
          this.currentUser = response;
          if (this.currentUser.Password === DEFAULT_PASSWORD) {
            this.router.navigate(["dashboard/update-password"]);
          }
        } else {
          // kick out
          this.authenticateService.logout();
          // const message = 'sorry something went wrong with your session, please Login again.';
          // this.loginProcess.showEmailNotification(message);
        }
      });

    this.notificationProcessService.castNotificationProcess.subscribe(
      process => {
        this.showUplaod = process.showUplaod;
      }
    );
  }
}
