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
import { ExitModalEventEmmiter, Client } from "src/app/models";
import { Observable } from "rxjs";

@Component({
  selector: "app-dashboard-nav",
  templateUrl: "./dashboard-nav.component.html",
  styleUrls: ["./dashboard-nav.component.scss"]
})
export class DashboardNavComponent implements OnInit {
  showBuyShares: boolean = false;
  showOverlay: boolean = false;
  client: Client; // full user structure
  user: User; // pass role clientId
  mylink = "hello";

  notifications = [];
  showNotification: boolean = false;
  constructor(
    private routeTo: Router,
    private authenticateService: AuthenticateService,
    private documentsService: DocumentsService,
    private cleintService: CleintService,
    private notificationProcessService: NotificationProcessService
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
  }
  logout() {
    this.authenticateService.logout();
    this.routeTo.navigate(["/"]);
  }

  toggleBuyShares() {
    this.showBuyShares = !this.showBuyShares;
    return (this.showOverlay = !this.showOverlay);
  }

  closeModal(event: ExitModalEventEmmiter) {
    event.close = this.toggleBuyShares();
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
  copylink() {
    this.copyText(this.mylink);
    alert("Your link is copied");
  }
  copyText(val: string) {
    let selBox = document.createElement("textarea");
    selBox.style.position = "fixed";
    selBox.style.left = "0";
    selBox.style.top = "0";
    selBox.style.opacity = "0";
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand("copy");
    document.body.removeChild(selBox);
  }
  openNotification(notification: UserNotification) {
    if (notification.isShare) {
      // alert(notification.id);
      this.notificationProcessService.showUplaod();
      this.notificationProcessService.updateInvestementId(notification.id);
    }
  }
}
