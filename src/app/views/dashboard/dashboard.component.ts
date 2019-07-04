import { Router, NavigationEnd } from '@angular/router';
import {
  AuthenticateService,
  NotificationProcessService,
  InvestmentService
} from "src/app/services";
import { Component, OnInit } from "@angular/core";
import { ADMIN_USER_ROLE} from "src/app/shared/config";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  isCurrentUserAdmin: boolean = false;
  showUplaod: boolean = false;
  ClientRef: string;

  constructor(
    private authenticateService: AuthenticateService,
    private notificationProcessService: NotificationProcessService,
    private routeTo: Router
  ) {
    var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
    (function(){
    var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
    s1.async=true;
    s1.src='https://embed.tawk.to/5d17b35b22d70e36c2a364bb/default';
    s1.charset='UTF-8';
    s1.setAttribute('crossorigin','*');
    s0.parentNode.insertBefore(s1,s0);
    })();
  }

  ngOnInit() {
    const user = this.authenticateService.currentUserValue;
    this.ClientRef = `CTG-${user.ClientRef}`;
    this.isCurrentUserAdmin = Number(user.Role) == ADMIN_USER_ROLE;

    // notifications
    this.notificationProcessService.castNotificationProcess.subscribe(
      process => {
        this.showUplaod = process.showUplaod;
      }
    );

    
    //scroll up
    this.routeTo.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  });
  }
  logout() {
    this.authenticateService.logout();
    this.routeTo.navigate(["/"]);
  }
}
