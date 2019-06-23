import { UserNotification } from "./../../../models/processes/notification.process.model";
import { REFERALLINK } from "src/app/shared/config";
import { WEB_HOST } from "./../../../shared/config";
import { User } from "src/app/models/user";
import {
  AuthenticateService,
  DocumentsService,
  CleintService,
  NotificationProcessService
} from "src/app/services";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Client } from "src/app/models";
import { MessageService } from "primeng/api";
import { BuySharesProcessService } from "src/app/services/app-state/buy-shares-process.service";

@Component({
  selector: "app-dashboard-nav",
  templateUrl: "./dashboard-nav.component.html",
  styleUrls: ["./dashboard-nav.component.scss"]
})
export class DashboardNavComponent implements OnInit {
  showBuyShares: boolean;
  showMobNots: boolean = true;
  showOverlay: boolean = false;
  client: Client; // full user structure
  user: User; // pass role clientId
  mylink = "hello";

  notifications = [];
  showNotification: boolean = false;
  showMobileNav: boolean;
  constructor(
    private routeTo: Router,
    private authenticateService: AuthenticateService,
    private documentsService: DocumentsService,
    private cleintService: CleintService,
    private notificationProcessService: NotificationProcessService,
    private messageService: MessageService,
    private buySharesProcessService: BuySharesProcessService
  ) {}
  hasDocs: boolean = true;
  documents: any[] = [];
  ngOnInit() {
    this.user = this.authenticateService.currentUserValue;

    this.documentsService
      .getClientDocuments(this.user.ClientId)
      .subscribe(r => {
        this.documents = r;
        if (this.documents.length < 0) {
          this.hasDocs = false;
        }
      });

    this.getUserDetails();

    this.notificationProcessService.castNotificationProcess.subscribe(
      process => {
        this.notifications = process.notifications;
      }
    );

    //show buy shares
    this.buySharesProcessService.castBuySharesProcess.subscribe(process=>{
      this.showBuyShares = process.showBuyForm;
      this.showOverlay = process.showOverlay;
      // alert(JSON.stringify(process))
    })
  }
  logout() {
    this.authenticateService.logout();
    this.routeTo.navigate(["/"]);
  }
buyShares(){
  this.buySharesProcessService.showBuyShares();
}
  toggleBuyShares() {
    this.closeMobileNav()
    this.buySharesProcessService.closeBuyShares();
    return (this.showOverlay = !this.showOverlay);
  }


  showNotifications() {
    this.showNotification = !this.showNotification;
  }

  getUserDetails() {
    this.cleintService.getClientById(this.user.ClientId).subscribe(r => {
      this.client = r;
      this.mylink = `${WEB_HOST}/#/${REFERALLINK}/${this.client.ClientId}`;
    });
  }

  openNotification(notification: UserNotification) {
    if (notification.isShare) {
      this.notificationProcessService.showUplaod();
      this.notificationProcessService.updateInvestementId(notification.id);
    }
  }
  openMobileNav() {
    this.showMobileNav = true;
  }
  closeMobileNav() {
    this.showMobileNav = false;
  }
}
