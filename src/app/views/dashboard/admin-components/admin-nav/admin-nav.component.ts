import { Component, OnInit } from '@angular/core';
import { Client, ExitModalEventEmmiter } from 'src/app/models';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { AuthenticateService, DocumentsService, CleintService, NotificationProcessService } from 'src/app/services';
import { WEB_HOST, REFERALLINK } from 'src/app/shared/config';
import { UserNotification } from 'src/app/models/processes/notification.process.model';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.scss']
})
export class AdminNavComponent implements OnInit {

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




  getUserDetails() {
    this.cleintService.getClientById(this.user.ClientId).subscribe(r => {
      this.client = r;
      this.mylink = `${WEB_HOST}/#/${REFERALLINK}/${this.client.ClientId}`;
    });
  }
 
  


}
