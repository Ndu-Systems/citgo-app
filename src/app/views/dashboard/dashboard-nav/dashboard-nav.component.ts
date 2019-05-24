import { User } from 'src/app/models/user';
import { AuthenticateService, DocumentsService } from "src/app/services";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ExitModalEventEmmiter } from "src/app/models";

@Component({
  selector: "app-dashboard-nav",
  templateUrl: "./dashboard-nav.component.html",
  styleUrls: ["./dashboard-nav.component.scss"]
})
export class DashboardNavComponent implements OnInit {
  showBuyShares: boolean = false;
  showOverlay: boolean = false;
  currentUser:User;
  constructor(
    private routeTo: Router,
    private authenticateService: AuthenticateService,
    private documentsService: DocumentsService
  ) {}
  hasDocs: boolean = true;
  documents:any[]=[];
  ngOnInit() {
   this.currentUser = this.authenticateService.currentUserValue;

    this.documentsService.getClientDocuments(this.currentUser.ClientId).subscribe(r=>{
      this.documents = r;
      if(this.documents.length < 0){
        this.hasDocs = false;
      }

    })
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
  closeNav(){
  }
}
