import { AuthenticateService } from './../../../../services/home/user/authenticate.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { InvestmentService, CleintService } from 'src/app/services';
import { Investment } from 'src/app/models';
import { WITHDRAWABLE } from 'src/app/shared/config';
import { Wallet } from 'src/app/models/wallet.model';
import { WithdrawalService } from 'src/app/services/dashboard/withdrawal/withdrawal.service';


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
  // details: Detail[] = [];
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
  clientwithdrawals: any;
  constructor(
    private router: Router,
    private investmentService: InvestmentService,
    private authenticateService: AuthenticateService,
    private cleintService: CleintService,
    private withdrawalService: WithdrawalService,
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

    // get withdrawal
    this.withdrawalService.getClientWithdrawal(this.cleintId).subscribe(r => {
      this.clientwithdrawals = r;
      console.log(r);
      
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
