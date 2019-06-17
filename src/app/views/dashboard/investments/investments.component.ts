import { Component, OnInit } from "@angular/core";
import { Investment } from "src/app/models";
import {
  InvestmentService,
  AuthenticateService,
  NotificationProcessService
} from "src/app/services";
import { User } from "src/app/models/user";
import { ConfirmationService, MessageService } from "primeng/api";
import { SHARE_REMOVED } from "src/app/shared/config";

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
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {}

  ngOnInit() {
 this.init();
  }
  init(){
    this.user = this.authenticationService.currentUserValue;
    this.investmentService
      .getInvestmentsByClientId(this.user.ClientId)
      .subscribe(response => {
        if (response.investments) {
          this.investmentService.setInvestments(response.investments);
        }
      });

    this.investmentService.castClientshares.subscribe(val => {
      if (val) {
        this.investmentsList = val;
      }
    });
  }
  oplaodPOP(data: Investment) {
    this.notificationProcessService.showUplaod();
    this.notificationProcessService.updateInvestementId(data.InvestmentId);
  }
  remove(investment: Investment) {
    this.confirmationService.confirm({
      message: `You are about to delete  ${investment.Name}, continue?`,
      accept: () => {
        investment.StatusId = SHARE_REMOVED;
        this.investmentService.updateInvestment(investment).subscribe(r => {
        this.init();

          this.messageService.add({
            life: 7000,
            severity: "info",
            summary: "Info",
            detail: "Share was removed successfully"
          });
  
        });
      }
    });
  }
}
