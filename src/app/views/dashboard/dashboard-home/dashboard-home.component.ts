import { Component, OnInit } from "@angular/core";
import {
  AuthenticateService,
  LoginProcessService,
  NotificationProcessService,
  InvestmentService
} from "src/app/services";
import { User } from "src/app/models/user";
import { Router } from "@angular/router";
import {
  DEFAULT_PASSWORD,
  ADMIN_USER_ROLE,
  SHARE_PENDING
} from "src/app/shared/config";
import { Investment } from "src/app/models";

@Component({
  selector: "app-dashboard-home",
  templateUrl: "./dashboard-home.component.html",
  styleUrls: ["./dashboard-home.component.scss"]
})
export class DashboardHomeComponent implements OnInit {
  currentUser: User;
  showUplaod: boolean;
  isCurrentUserAdmin: boolean = false;

  //banking details
  isFnb = true;
  isStandardBank = false;
  investmentsList: Investment[] = [];
  amount;
  showBankingInfo: boolean;

  constructor(
    private authenticateService: AuthenticateService,
    private loginProcess: LoginProcessService,
    private notificationProcessService: NotificationProcessService,
    private router: Router,
    private investmentService: InvestmentService
  ) {}

  ngOnInit() {
    const user = this.authenticateService.currentUserValue;
    this.isCurrentUserAdmin = Number(user.Role) == ADMIN_USER_ROLE;
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

    //banking info
    this.investmentService.castClientshares.subscribe(val => {
      if (val) {
        this.investmentsList = val;
        let pending: Investment[] = this.investmentsList.filter(
          x => x.StatusId == SHARE_PENDING
        );
        if (pending.length > 0) {
          console.log(' pending[0]', pending[0]);
          
          this.amount = pending[0].Amount;
          this.showBankingInfo = true;
          if (pending[0].bankId == 1) {
            this.isFnb = true;
            this.isStandardBank = false;
          } else if (pending[0].bankId == 2) {
            this.isStandardBank = true;
            this.isFnb = false;
          }
        }else{
          this.showBankingInfo = false;
        }
      }
    });
  }
}
