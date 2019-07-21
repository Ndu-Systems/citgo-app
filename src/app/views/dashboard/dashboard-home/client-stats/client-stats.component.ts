import { Bonus } from './../../../../models/bonus.model';
import { BonusService } from 'src/app/services/dashboard/bonus.service';
import { AuthenticateService } from './../../../../services/home/user/authenticate.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { InvestmentService, CleintService } from 'src/app/services';
import { Investment } from 'src/app/models';
import { WITHDRAWABLE } from 'src/app/shared/config';
import { Wallet } from 'src/app/models/wallet.model';


export interface Detail {
  key: string;
  value: number;
  days: number;
  available: number;
}
@Component({
  selector: 'app-client-stats',
  templateUrl: './client-stats.component.html',
  styleUrls: ['./client-stats.component.scss']
})
export class ClientStatsComponent implements OnInit {
  cleintId: any;
  investments: Investment[] = [];
  details: Detail[] = [];
  // funds
  totalProfit = 0;
  availableProfit = 0;
  availableFunds = 0;
  availableBonus = 0;
  totalBonuses = 0;
  withdrawn = 0;
  client$;
  client: any;
  withDisabled: boolean;
  constructor(
    private router: Router,
    private investmentService: InvestmentService,
    private authenticateService: AuthenticateService,
    private bonusService: BonusService,
    private cleintService: CleintService,
  ) { }

  ngOnInit() {
    const user: User = this.authenticateService.currentUserValue;
    this.cleintId = user.ClientId;
    this.client$ = this.cleintService.getClientById(this.cleintId);
    // get wallet
    this.investmentService.getClientWallet(this.cleintId).subscribe(r => {
      const wallet: Wallet = r;
      const profit = Number(wallet.profit);
      const bonuses = Number(wallet.bonuses);
      const withdrawals = Number(wallet.withdrawals);
      this.availableFunds = (profit + bonuses) - withdrawals;
      this.totalBonuses = bonuses;
      this.totalProfit = profit;
      this.withdrawn = withdrawals;
      if (this.availableFunds >= 1000) {
        this.withDisabled = true;
      }
      this.availableBonus = bonuses;
      this.availableProfit = profit;
      // get avilbale bonus
      if (withdrawals > 0) {
        if (profit > bonuses && withdrawals <= bonuses) {
          this.availableBonus = bonuses - withdrawals;
        } else {
          this.availableBonus = 0;
          this.availableProfit = this.availableFunds;
        }
        if (bonuses > profit && withdrawals <= profit) {
          this.availableBonus = bonuses - withdrawals;
          this.availableProfit = profit;
        }
      }


    });
    // get cleint shares
    this.investmentService
      .getInvestmentsByClientId(this.cleintId)
      .subscribe(response => {
        if (response.investments) {
          this.investments = response.investments;

          // get details
          this.investments.filter(x => x.Status === 'ACTIVE').forEach(val => {
            const detail: Detail = {
              key: val.Name,
              value: Number(val.Growth - val.Amount),
              days: Number(val.DaysNow),
              available: Number(val.DaysNow) >= 30 ? Number(val.Growth - val.Amount) : 0
            };
            console.log(detail);

            this.details.push(detail);
          });
        }
      });
  }
  AddRef() {
    this.router.navigate(['dashboard/my-refferals', this.cleintId]);
  }
  withdraw() {
    localStorage.setItem(WITHDRAWABLE, this.availableFunds + '');
    this.router.navigate(['dashboard/do-withdrawal', this.cleintId]);
  }
  buyShares() {
    // this.buySharesProcessService.showBuyShares();
    this.router.navigate(['dashboard/buy-share', this.cleintId]);
  }
}
