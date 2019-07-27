import { Component, OnInit } from '@angular/core';
import { Investment } from 'src/app/models';
import { Router } from '@angular/router';
import { InvestmentService, AuthenticateService, CleintService } from 'src/app/services';
import { User } from 'src/app/models/user';
import { Wallet } from 'src/app/models/wallet.model';
import { WITHDRAWABLE } from 'src/app/shared/config';

@Component({
  selector: 'app-admin-view-client-stat',
  templateUrl: './admin-view-client-stat.component.html',
  styleUrls: ['./admin-view-client-stat.component.scss']
})
export class AdminViewClientStatComponent implements OnInit {

  cleintId: any;
  investments: Investment[] = [];
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
    private cleintService: CleintService,
  ) { 
  }

  ngOnInit() {
    this.cleintId =     this.cleintService.getSelectedClientId();
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
  }

  ViewRef() {
    this.router.navigate(['dashboard/admin-view-clinet-referals', this.cleintId]);
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
