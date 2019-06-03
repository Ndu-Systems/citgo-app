import { Bonus } from './../../../../models/bonus.model';
import { CleintService } from "./../../../../services/dashboard/cleint.service";
import { MessageService } from "primeng/api";
import {
  SHARE_PENDING_VERFICATION,
  SHARE_ACTIVE,
  BONUS_PERCENT
} from "./../../../../shared/config";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { InvestmentService } from "src/app/services";
import { Investment, Client } from "src/app/models";
import { BonusService } from "src/app/services/dashboard/bonus.service";

@Component({
  selector: "app-to-action",
  templateUrl: "./to-action.component.html",
  styleUrls: ["./to-action.component.scss"]
})
export class ToActionComponent implements OnInit {
  shares$: Observable<
    Investment[]
  > = this.investmentService.getInvestmentsByStatus(SHARE_PENDING_VERFICATION);
  constructor(
    private investmentService: InvestmentService,
    private bonusService: BonusService,
    private messageService: MessageService,
    private cleintService: CleintService
  ) {}

  ngOnInit() {}
  Approve(data: Investment) {
    data.StatusId = SHARE_ACTIVE;
    this.investmentService.updateInvestment(data).subscribe(res => {
      let updatedInvestment: Investment = res;
      if (updatedInvestment.StatusId == SHARE_ACTIVE) {
        this.messageService.add({
          severity: "success",
          summary: "Now active! ",
          detail: "Share approved!"
        });
        // grant a bonus
        this.cleintService.getClientById(updatedInvestment.ClientId).subscribe(clientRes=>{
          let client:Client = clientRes;
          if(client.ClientId && client.ParentId){
            let bonus:Bonus = {
              Amount: updatedInvestment.Amount*BONUS_PERCENT,
              ClientId: client.ParentId,
              ParentId: updatedInvestment.ClientId,
              CreateUserId:'SYS',
              ModifyUserId: 'SYS',
              StatusId: 1
            }
            this.bonusService.addBonus(bonus).subscribe(bon=>{
              
            })
          }
        })
      }
    });
  }
}
 