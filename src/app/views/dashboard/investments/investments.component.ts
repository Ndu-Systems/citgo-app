import { Component, OnInit } from "@angular/core";
import { Investment } from "src/app/models";
import { InvestmentService, AuthenticateService,NotificationProcessService } from "src/app/services";
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
        if(val){
          this.investmentsList = val;
        }
      });
  
  }
  oplaodPOP(data:Investment){
    this.notificationProcessService.showUplaod();
    this.notificationProcessService.updateInvestementId(data.InvestmentId);
  }
 
}
