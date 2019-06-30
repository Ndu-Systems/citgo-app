import { Bonus } from "./../../../../models/bonus.model";
import { BonusService } from "src/app/services/dashboard/bonus.service";
import { AuthenticateService } from "./../../../../services/home/user/authenticate.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { BuySharesProcessService } from "src/app/services/app-state/buy-shares-process.service";
import { User } from "src/app/models/user";
import { InvestmentService, CleintService } from "src/app/services";
import { Investment } from "src/app/models";
import { WITHDRAWABLE } from "src/app/shared/config";


export interface Detail{
  key:string;
  value:number;
}
@Component({
  selector: "app-client-stats",
  templateUrl: "./client-stats.component.html",
  styleUrls: ["./client-stats.component.scss"]
})
export class ClientStatsComponent implements OnInit {
  cleintId: any;
  investments: Investment[] = [];
  details:Detail[]=[];
  //funds
  totalProfit: number = 0;
  availableFunds = 0;
  totalBonuses = 0;
  client$;
  client: any;
  constructor(
    private router: Router,
    private investmentService: InvestmentService,
    private authenticateService: AuthenticateService,
    private bonusService: BonusService,
    private cleintService: CleintService,
  ) {}

  ngOnInit() {
    let user: User = this.authenticateService.currentUserValue;
    this.cleintId = user.ClientId;
    this.client$ = this.cleintService.getClientById(this.cleintId);


  //get client
 
    //get cleint shares
    this.investmentService
      .getInvestmentsByClientId(this.cleintId)
      .subscribe(response => {
        if (response.investments) {
          this.investments = response.investments;
          //total profit
          this.investments.forEach(val => {
            this.totalProfit += Number(val.Growth - val.Amount);
          });


          //total profit
          this.investments.filter(x=>x.Status === 'ACTIVE').forEach(val => {
            this.availableFunds += Number(val.Growth - val.Amount);
          });

          // get details
          this.investments.filter(x=>x.Status === 'ACTIVE').forEach(val => {
            let detail:Detail = {
              key:val.Name,
              value:Number(val.Growth - val.Amount)
            };
            this.details.push(detail)
          });
        }

        // get bonuses
        this.bonusService.getClientBonuses(this.cleintId).subscribe(r => {
          this.totalBonuses;
          let bonuses: Bonus[] = r;
          bonuses.forEach(val => {
            this.totalBonuses += Number(val.Amount);
          });
          this.availableFunds += this.totalBonuses;
        });
      });
  }
  AddRef() {
    this.router.navigate(["dashboard/my-refferals", this.cleintId]);
  }
  withdraw() {
    localStorage.setItem(WITHDRAWABLE, this.availableFunds+'')
    this.router.navigate(["dashboard/do-withdrawal", this.cleintId]);
  }
  buyShares() {
    // this.buySharesProcessService.showBuyShares();
    this.router.navigate(["dashboard/buy-share", this.cleintId]);
  }
}
