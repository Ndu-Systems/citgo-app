import { UserNotification } from "./../../../models/processes/notification.process.model";
import { SHARE_PENDING } from "./../../../shared/config";
import { Component, OnInit } from "@angular/core";
import { Investment } from "src/app/models";
import { InvestmentService, AuthenticateService, NotificationProcessService } from "src/app/services";
import { User } from "src/app/models/user";

@Component({
  selector: "app-investments",
  templateUrl: "./investments.component.html",
  styleUrls: ["./investments.component.scss"]
})
export class InvestmentsComponent implements OnInit {
  investmentsList: Investment[] = [];
  status: string = "";
  user: User;
  constructor(
    private investmentService: InvestmentService,
    private authenticationService: AuthenticateService,
    private notificationProcessService: NotificationProcessService,
  ) {}

  ngOnInit() {

    this.user = this.authenticationService.currentUserValue;
    this.investmentService
      .getInvestmentsByClientId(this.user.ClientId)
      .subscribe(response => {
        if (response.investments) {
          this.investmentService.setInvestments(response.investments);
        }
      });

      this.investmentService.castClientshares.subscribe(val => {
        this.investmentsList = val;
      });

      this.checkForPending();
  
  }
  checkForPending() {
    // alert(JSON.stringify(this.investmentsList))
    this.notificationProcessService.updateNotificationProcessState([]);
    let pendings = this.investmentsList.filter(x => Number(x.StatusId) == SHARE_PENDING);
    if (pendings.length > 0) {
      let nots: UserNotification[] = [];
      pendings.forEach(investent => {
        nots.push({ id: investent.InvestmentId,isShare:true, message: `Please uplaod proof of payment for ${investent.Name}` });
      });
      this.notificationProcessService.updateNotificationProcessState(nots);
    }
  }
}
